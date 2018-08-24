using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security;
using System.Threading.Tasks;
using KimppakyytiApi.Models;
using KimppakyytiApi.Models.RouteLogic;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Protocols;
using Newtonsoft.Json;


namespace KimppakyytiApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class RideController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly DocumentClient _cosmosDBclient;
        private const string _dbName = "RideDB";
        private const string _collectionName = "Ride";
        private static readonly string endpointUri = ConfigurationManager.AppSettings["EndpointUri"];
        private static readonly string key = ConfigurationManager.AppSettings["PrimaryKey"];
        
        private static SecureString toSecureString(string v)
        {
            SecureString s = new SecureString();

            foreach (var item in v)
            {
                s.AppendChar(item);
            }
            return s;
        }

        public RideController(IConfiguration configuration)
        {
            _configuration = configuration;
            var endpointUri =
            _configuration["AppSettings:EndpointUri"];
            var key =
            _configuration["AppSettings:PrimaryKey"];


            // Reading EndpointUri and PrimaryKey from AzurePortal
            endpointUri = Environment.GetEnvironmentVariable("APPSETTING_EndpointUri");
            key = Environment.GetEnvironmentVariable("APPSETTING_PrimaryKey");
           
            _cosmosDBclient = new DocumentClient(new Uri(endpointUri), key);
            _cosmosDBclient.CreateDatabaseIfNotExistsAsync(new Database
            {
                Id = _dbName
            }).Wait();
            
            _cosmosDBclient.CreateDocumentCollectionIfNotExistsAsync(

            UriFactory.CreateDatabaseUri(_dbName),
            new DocumentCollection { Id = _collectionName });
        }
        [HttpGet]
        public string Mita()
        {
            return Environment.GetEnvironmentVariable("APPSETTING_EndpointUri");
        }

        [HttpGet]
        public string Ping()
        {
            return "Nyt on tehty collection, vaikka sitä ei oltu tehty aiemmin!";
        }
        [HttpPost]
        public async Task<ActionResult<string>> Post([FromBody] Ride value)
        {
            Document document = await _cosmosDBclient.CreateDocumentAsync(
          UriFactory.CreateDocumentCollectionUri(_dbName, _collectionName),
          value);

            // Get route from Google Directions Api
            string response = await GoogleApiFunctions.GetRouteGoogle(value.StartAddress, value.TargetAddress);
            // parse response to CosmoDB

            return response;
            //return Ok(document.Id);
        }
        [HttpGet]
        public ActionResult<List<Ride>> SearchRidesByLocation()
        {
            try
            {
               
                FeedOptions queryOptions = new FeedOptions { MaxItemCount = -1 };
                IQueryable<Ride> query = _cosmosDBclient.CreateDocumentQuery<Ride>(
                UriFactory.CreateDocumentCollectionUri(_dbName, _collectionName),
                    $"SELECT * FROM c WHERE  ST_DISTANCE (c.StartLocation, {"StartLocation": [ 62.8979675, 27.678122]}) < 100 * 1000",
                    //$"SELECT * FROM c WHERE c[\"When\"] ={time}",             

                    queryOptions);

                return Ok(query.ToList());
            }
            catch (DocumentClientException de)
            {
                switch (de.StatusCode.Value)
                {
                    case System.Net.HttpStatusCode.NotFound:
                        return NotFound();
                }
            }
            return BadRequest();
        }
        [HttpGet]
        public ActionResult<List<Ride>> SearchRidesByTime(string time, string otherTime)
        {
            try //Searching Rides from CosmosDB with right TimeTable.
            {     
                FeedOptions queryOptions = new FeedOptions { MaxItemCount = -1 };
                IQueryable<Ride> query = _cosmosDBclient.CreateDocumentQuery<Ride>(
                UriFactory.CreateDocumentCollectionUri(_dbName, _collectionName),
                    $"SELECT * FROM c WHERE c[\"When\"] BETWEEN {time} AND {otherTime}",      
                    //$"SELECT * FROM c WHERE c[\"When\"] ={time}",             
                    
                    queryOptions); 

                return Ok(query.ToList());
            }
            catch (DocumentClientException de)
            {
                switch (de.StatusCode.Value)
                {
                    case System.Net.HttpStatusCode.NotFound:
                        return NotFound();
                }
            }
            return BadRequest();
        }
   
        [HttpGet]
        public ActionResult<List<Ride>> GetAllRides()
        {
            try 
            {
                FeedOptions queryOptions = new FeedOptions { MaxItemCount = -1 };
                IQueryable<Ride> query = _cosmosDBclient.CreateDocumentQuery<Ride>(
                UriFactory.CreateDocumentCollectionUri(_dbName, _collectionName),
                $"SELECT * FROM C",
                queryOptions);
                return Ok(query.ToList());
            }
            catch (DocumentClientException de)
            {
                switch (de.StatusCode.Value)
                {
                    case System.Net.HttpStatusCode.NotFound:
                        return NotFound();
                }
            }
            return BadRequest();
        }

        [HttpPost]
        public async Task<ActionResult<string>> PostOfferRideAsync([FromBody] Ride value)
        {
            //Functions for delayed response -- timeout try /catch

            // Get route from Google Directions Api
            var response = await GoogleApiFunctions.GetRouteGoogle(value.StartAddress, value.TargetAddress);
            // parse response
            RootObject obj = JsonConvert.DeserializeObject<RootObject>(response);

            //return $"Start loc: Mysteerinollapolla:{obj.routes[0].legs[0].start_location.fakeNews} start lat: {obj.routes[0].legs[0].start_location.lat} start lng: {obj.routes[0].legs[0].start_location.lng} TargetLoc lat: {obj.routes[0].legs[0].end_location.lat} TargetLocation lng {obj.routes[0].legs[0].end_location.lng} ";

            if (obj.status == "ZERO_RESULTS")
            {
                return "Reittiä ei löytynyt. Tarkista antamasi osoitteet, tai kokeile hakea kaupunginosalla.";
            }
            else if (obj.status == "OK")
            {
                //start and end point from Google to CosmosDB -object
                value.StartLocation = new decimal[2];
                value.StartLocation[0] = obj.routes[0].legs[0].start_location.lat;
                value.StartLocation[1] = obj.routes[0].legs[0].start_location.lng;

                value.TargetLocation = new decimal[2];
                value.TargetLocation[0] = obj.routes[0].legs[0].end_location.lat;
                value.TargetLocation[1] = obj.routes[0].legs[0].end_location.lng;

                //parse route points to Ride -object points in between - unless query is null
                //if (obj.routes[0].legs[0].steps[0].end_location.lat != 0 && obj.routes[0].legs[0].steps[0].end_location.lng != 0)
                //{
                //    int i = 0;

                //    foreach (var item in obj.routes[0].legs[0].steps)
                //    {
                //        value.RoutePoint[0] = item.end_location.lat;
                //        value.RoutePoint[1] = item.end_location.lng;
                //        i++;
                //    }
                //}

                Document document = await _cosmosDBclient.CreateDocumentAsync(
                UriFactory.CreateDocumentCollectionUri(_dbName, _collectionName),
                value);

                return Ok(document.ToString());
            }
            else
            {
                return "Nyt kävi jotain.";
            }
        }

        [HttpDelete]
        public async Task<ActionResult<string>> DeleteRide(string documentId)
        {
            try
            {
                await _cosmosDBclient.DeleteDocumentAsync(
                 UriFactory.CreateDocumentUri(_dbName, _collectionName, documentId));
                return Ok($"Deleted document id {documentId}");
            }
            catch (DocumentClientException de)
            {
                switch (de.StatusCode.Value)
                {
                    case System.Net.HttpStatusCode.NotFound:
                        return NotFound();
                }
            }
            return BadRequest();
        }
    }
}