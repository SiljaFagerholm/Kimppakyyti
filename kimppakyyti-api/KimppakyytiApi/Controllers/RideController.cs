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
using Microsoft.Azure.Documents.Linq;
using Microsoft.Azure.Documents.Spatial;
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
        private Uri rideCollectionUri = UriFactory.CreateDocumentCollectionUri(_dbName, _collectionName);

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


            //Reading EndpointUri and PrimaryKey from AzurePortal
            //endpointUri = Environment.GetEnvironmentVariable("APPSETTING_EndpointUri");
            //key = Environment.GetEnvironmentVariable("APPSETTING_PrimaryKey");

            _cosmosDBclient = new DocumentClient(new Uri("https://loppuprojekti.documents.azure.com:443/"), "XzoPgAggVkFhshSEq9WCvZeRkFSnFhSvukkbI07Ou1juLDzyVo4Ek9YJlW0sVog1UZoGXcR8CaJYXSXdLZmAAw==");
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
        public ActionResult<List<Ride>> SearchRidesByTime(string startTime, string endTime)
        {
            try //Searching Rides from CosmosDB with right TimeTable.

            {
                FeedOptions queryOptions = new FeedOptions { MaxItemCount = -1 };
                IQueryable<Ride> query = _cosmosDBclient.CreateDocumentQuery<Ride>(
                UriFactory.CreateDocumentCollectionUri(_dbName, _collectionName),
                    $"SELECT * FROM c WHERE c[\"When\"] BETWEEN {startTime} AND {endTime}",

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

        [HttpPost]
        public async Task<ActionResult<List<RideOut>>> SearchRidesCustomerAsync([FromBody]Ride valueIn)
        {
            try //Searching Rides from CosmosDB with right TimeTable.

            {
                {
                    //Functions for delayed response -- timeout try /catch

                    // Get route from Google Directions Api
                    var response = await GoogleApiFunctions.GetRouteGoogle(valueIn.StartAddress, valueIn.TargetAddress);

                    // parse response from Google
                    RootObject obj = JsonConvert.DeserializeObject<RootObject>(response);
                    RideOut valueOut = new RideOut();


                    if (obj.status == "ZERO_RESULTS")
                    {
                        return NoContent();// "Reittiä ei löytynyt. Tarkista antamasi osoitteet, tai kokeile hakea kaupunginosalla.";
                    }
                    else if (obj.status == "OK")
                    {
                        // parse incoming object to outgoing  start and end point from Google to CosmosDB -object
                        valueOut.Nickname = valueIn.Nickname;
                        valueOut.Price = valueIn.Price;
                        valueOut.StartTime = valueIn.StartTime;
                        valueOut.EndTime = valueIn.EndTime;
                        valueOut.StartAddress = valueIn.StartAddress;
                        valueOut.StartLocation = new Point(obj.routes[0].legs[0].start_location.lng, obj.routes[0].legs[0].start_location.lat);
                        valueOut.TargetAddress = valueIn.TargetAddress;
                        valueOut.TargetLocation = new Point(obj.routes[0].legs[0].end_location.lng, obj.routes[0].legs[0].end_location.lat);

                        //foreach (var location in obj.routes[0].legs[0].steps)
                        //{
                        //    valueOut.RoutePoints.Add(new Point(location.end_location.lng, location.end_location.lat));
                        //}
                        valueOut.OfferingRide = valueIn.OfferingRide;
                        valueOut.SeatsLeft = valueIn.SeatsLeft;
                        valueOut.MondayFrequency = valueIn.MondayFrequency;
                        valueOut.TuesdayFrequency = valueIn.TuesdayFrequency;
                        valueOut.WednesdayFrequency = valueIn.WednesdayFrequency;
                        valueOut.ThursdayFrequency = valueIn.ThursdayFrequency;
                        valueOut.FridayFrequency = valueIn.FridayFrequency;
                        valueOut.SaturdayFrequency = valueIn.SaturdayFrequency;
                        valueOut.SundayFrequency = valueIn.SundayFrequency;

                        // How to check if document == created?
                        Document document = await _cosmosDBclient.CreateDocumentAsync(
                        UriFactory.CreateDocumentCollectionUri(_dbName, _collectionName),
                        valueOut);


                        FeedOptions queryOptions = new FeedOptions { MaxItemCount = -1 };
                        IQueryable<RideOut> query = _cosmosDBclient.CreateDocumentQuery<RideOut>(
                        rideCollectionUri, queryOptions).Where(f => f.OfferingRide == true && f.StartTime >= valueOut.StartTime && f.StartTime <= valueOut.EndTime); // Distance (to) etäisyys metreinä

                        // check for contents in query before returning?

                        return query.ToList();
                    }

                    else
                    {
                        return NoContent();// "Nyt kävi jotain.";
                    }
                }
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
        public async Task<ActionResult<string>> PostOfferRideAsync([FromBody] Ride valueIn)
        {
            //Functions for delayed response -- timeout try /catch

            // Get route from Google Directions Api
            var response = await GoogleApiFunctions.GetRouteGoogle(valueIn.StartAddress, valueIn.TargetAddress);
            // parse response
            RootObject obj = JsonConvert.DeserializeObject<RootObject>(response);
            RideOut valueOut = new RideOut();


            if (obj.status == "ZERO_RESULTS")
            {
                return "Reittiä ei löytynyt. Tarkista antamasi osoitteet, tai kokeile hakea kaupunginosalla.";
            }
            else if (obj.status == "OK")
            {
                // parse incoming object to outgoing  start and end point from Google to CosmosDB -object
                valueOut.Nickname = valueIn.Nickname;
                valueOut.Price = valueIn.Price;
                valueOut.StartTime = valueIn.StartTime;
                if (valueIn.EndTime != null)
                {
                    valueOut.EndTime = valueIn.EndTime;
                }
                valueOut.StartAddress = valueIn.StartAddress;
                valueOut.StartLocation = new Point(obj.routes[0].legs[0].start_location.lng, obj.routes[0].legs[0].start_location.lat);
                valueOut.TargetAddress = valueIn.TargetAddress;
                valueOut.TargetLocation = new Point(obj.routes[0].legs[0].end_location.lng, obj.routes[0].legs[0].end_location.lat);

                //foreach (var location in obj.routes[0].legs[0].steps)
                //{
                //    valueOut.RoutePoints.Add(new Point(location.end_location.lng, location.end_location.lat));
                //}
                valueOut.OfferingRide = valueIn.OfferingRide;
                valueOut.SeatsLeft = valueIn.SeatsLeft;
                valueOut.MondayFrequency = valueIn.MondayFrequency;
                valueOut.TuesdayFrequency = valueIn.TuesdayFrequency;
                valueOut.WednesdayFrequency = valueIn.WednesdayFrequency;
                valueOut.ThursdayFrequency = valueIn.ThursdayFrequency;
                valueOut.FridayFrequency = valueIn.FridayFrequency;
                valueOut.SaturdayFrequency = valueIn.SaturdayFrequency;
                valueOut.SundayFrequency = valueIn.SundayFrequency;

                // How to check if document == created?
                Document document = await _cosmosDBclient.CreateDocumentAsync(
                UriFactory.CreateDocumentCollectionUri(_dbName, _collectionName),
                valueOut);

                return Ok("Ilmoituksesi on tallennettu järjestelmään.");
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