using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.Linq;
using System.Security;
using System.Text;
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
            endpointUri = Environment.GetEnvironmentVariable("appsetting_endpointuri");
            key = Environment.GetEnvironmentVariable("appsetting_primarykey");


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
        public string Ping()
        {
            return "Nyt on tehty collection, vaikka sitä ei oltu tehty aiemmin!";
        }
        //[HttpGet]
        //public ActionResult<List<Ride>> SearchRidesByLocation(string startlocation)
        //{
        //    try
        //    {

        //        FeedOptions queryOptions = new FeedOptions { MaxItemCount = -1 };
        //        IQueryable<Ride> query = _cosmosDBclient.CreateDocumentQuery<Ride>(
        //        UriFactory.CreateDocumentCollectionUri(_dbName, _collectionName),
        //            $"SELECT * FROM c WHERE  ST_DISTANCE (c.StartLocation, {"StartLocation": [ 62.8979675, 27.678122]}) < 100 * 1000",
        //            //$"SELECT * FROM c WHERE c[\"When\"] ={time}",             

        //            queryOptions);

        //        return Ok(query.ToList());
        //    }
        //    catch (DocumentClientException de)
        //    {
        //        switch (de.StatusCode.Value)
        //        {
        //            case System.Net.HttpStatusCode.NotFound:
        //                return NotFound();
        //        }
        //    }
        //    return BadRequest();
        //}
        //[HttpGet]
        //public ActionResult<List<Ride>> SearchRidesByTime(string startTime, string endTime)
        //{
        //    try //Searching Rides from CosmosDB with right TimeTable.

        //    {
        //        FeedOptions queryOptions = new FeedOptions { MaxItemCount = -1 };
        //        IQueryable<Ride> query = _cosmosDBclient.CreateDocumentQuery<Ride>(
        //        UriFactory.CreateDocumentCollectionUri(_dbName, _collectionName),
        //            $"SELECT * FROM c WHERE c[\"When\"] BETWEEN {startTime} AND {endTime}",

        //            //$"SELECT * FROM c WHERE c[\"When\"] ={time}",             

        //            queryOptions);

        //        return Ok(query.ToList());
        //    }
        //    catch (DocumentClientException de)
        //    {
        //        switch (de.StatusCode.Value)
        //        {
        //            case System.Net.HttpStatusCode.NotFound:
        //                return NotFound();
        //        }
        //    }
        //    return BadRequest();
        //}

        [HttpGet]
        public async Task<ActionResult<List<RideOut>>> GetSearchRidesCustomerAsync(DateTime startTime, DateTime endTime, string startAddress, string targetAddress)
        {
            try //Searching Rides from CosmosDB with right TimeTable.
            {
                {
                    //Functions for delayed response -- timeout try /catch

                    // Get route from Google Directions Api
                    var response = await GoogleApiFunctions.GetRouteGoogle(startAddress, targetAddress);

                    // parse response from Google
                    RootObject obj = JsonConvert.DeserializeObject<RootObject>(response);
                    RideOut valueOut = new RideOut();


                    if (obj.status == "ZERO_RESULTS")
                    {
                        return BadRequest("Reittiä ei löytynyt. Tarkista antamasi osoitteet, tai kokeile hakea kaupunginosalla.");
                    }
                    else if (obj.status == "OK")
                    {
                        // parse incoming object to outgoing  start and end point from Google to CosmosDB -object
                        valueOut.Nickname = "Haku";
                        valueOut.Price = 0.00;
                        valueOut.StartTime = startTime;
                        valueOut.EndTime = endTime;
                        valueOut.StartAddress = startAddress;
                        valueOut.StartLocation = new Point(obj.routes[0].legs[0].start_location.lng, obj.routes[0].legs[0].start_location.lat);
                        valueOut.TargetAddress = targetAddress;
                        valueOut.TargetLocation = new Point(obj.routes[0].legs[0].end_location.lng, obj.routes[0].legs[0].end_location.lat);
                        
                        valueOut.OfferingRide = false;
                        valueOut.SeatsLeft = 0;
                        valueOut.MondayFrequency = false;
                        valueOut.TuesdayFrequency = false;
                        valueOut.WednesdayFrequency = false;
                        valueOut.ThursdayFrequency = false;
                        valueOut.FridayFrequency = false;
                        valueOut.SaturdayFrequency = false;
                        valueOut.SundayFrequency = false;
                        
                        // search for matches
                        FeedOptions queryOptions = new FeedOptions { MaxItemCount = -1 };

                        IQueryable<RideOut> query = _cosmosDBclient.CreateDocumentQuery<RideOut>(
                        rideCollectionUri, queryOptions).Where(f => f.OfferingRide == true
                        && f.StartTime >= valueOut.StartTime
                        && f.StartTime <= valueOut.EndTime
                        && f.StartLocation.Distance(valueOut.StartLocation) < f.StartLocation.Distance(valueOut.TargetLocation));
                        //&& f.TargetLocation.Distance(valueOut.StartLocation) > f.TargetLocation.Distance(valueOut.TargetLocation));
                        //&& (f.RoutePoints.Where(p => p.Distance(valueOut.StartLocation) < 500).First() != null)); // Distance (to) etäisyys metreinä

                        List<RideOut> incomingRides = query.ToList();
                        List<RideOut> returnRides = new List<RideOut>();

                        foreach (var item in incomingRides)
                        {
                            bool startPointMatch = false;
                            bool targetPointMatch = false;
                            try
                            {
                                if (StaticFunctions.CalculateDistanceBetweenPoints(item.RoutePoints.Where(p => StaticFunctions.CalculateDistanceBetweenPoints(p, valueOut.StartLocation) < 501).First(), valueOut.StartLocation) < 501)
                                {
                                    
                                    startPointMatch = true;
                                }
                            }
                            catch (Exception)
                            {
                                //startPointMatch = false;
                                //continue;
                            }


                            try
                            {
                                if (StaticFunctions.CalculateDistanceBetweenPoints(item.RoutePoints.Where(p => StaticFunctions.CalculateDistanceBetweenPoints(p, valueOut.TargetLocation) < 501).First(), valueOut.TargetLocation) < 501) 
                                {
                                    targetPointMatch = true;
                                }
                            }
                            catch (Exception)
                            {
                                //targetPointMatch = false;
                                //continue;
                            }

                            if (startPointMatch && targetPointMatch)
                            {
                                returnRides.Add(item);
                            }
                            startPointMatch = false;
                            targetPointMatch = false;
                        }

                        // check for contents in query before returning?
                        if (returnRides == null)
                        {
                            valueOut.Nickname = "Hakusi ei tuottanut tuloksia";
                            returnRides.Add(valueOut);
                        }
                        return returnRides;
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
        public async Task<ActionResult<List<RideOut>>> GetSearchRidesLocationAsync(DateTime startTime, DateTime endTime, string startAddress)
        {
            try //Searching Rides from CosmosDB with right TimeTable.
            {
                {
                    //Functions for delayed response -- timeout try /catch

                    // Get route from Google Directions Api
                    var response = await GoogleApiFunctions.GetPlaceGoogle(startAddress);

                    // parse response from Google
                    RootObject obj = JsonConvert.DeserializeObject<RootObject>(response);
                    RideOut valueOut = new RideOut();


                    if (obj.status == "ZERO_RESULTS")
                    {
                        return BadRequest("Paikkaa ei löytynyt. Tarkista antamasi osoitteet, tai kokeile hakea kaupunginosalla.");
                    }
                    else if (obj.status == "OK")
                    {
                        // parse incoming object to outgoing  start and end point from Google to CosmosDB -object
                        valueOut.Nickname = "Haku";
                        valueOut.Price = 0.00;
                        valueOut.StartTime = startTime;
                        valueOut.EndTime = endTime;
                        valueOut.StartAddress = startAddress;
                        valueOut.StartLocation = new Point(obj.routes[0].legs[0].start_location.lng, obj.routes[0].legs[0].start_location.lat);

                        valueOut.OfferingRide = false;
                        valueOut.SeatsLeft = 0;
                        valueOut.MondayFrequency = false;
                        valueOut.TuesdayFrequency = false;
                        valueOut.WednesdayFrequency = false;
                        valueOut.ThursdayFrequency = false;
                        valueOut.FridayFrequency = false;
                        valueOut.SaturdayFrequency = false;
                        valueOut.SundayFrequency = false;

                        // search for matches
                        FeedOptions queryOptions = new FeedOptions { MaxItemCount = -1 };

                        IQueryable<RideOut> query = _cosmosDBclient.CreateDocumentQuery<RideOut>(
                        rideCollectionUri, queryOptions).Where(f => f.OfferingRide == true
                        && f.StartTime >= valueOut.StartTime
                        && f.StartTime <= valueOut.EndTime
                        && f.StartLocation.Distance(valueOut.StartLocation) < f.StartLocation.Distance(valueOut.TargetLocation));
                        //&& f.TargetLocation.Distance(valueOut.StartLocation) > f.TargetLocation.Distance(valueOut.TargetLocation));
                        //&& (f.RoutePoints.Where(p => p.Distance(valueOut.StartLocation) < 500).First() != null)); // Distance (to) etäisyys metreinä

                        List<RideOut> incomingRides = query.ToList();
                        List<RideOut> returnRides = new List<RideOut>();

                        foreach (var item in incomingRides)
                        {
                            bool startPointMatch = false;
                            try
                            {
                                if (StaticFunctions.CalculateDistanceBetweenPoints(item.RoutePoints.Where(p => StaticFunctions.CalculateDistanceBetweenPoints(p, valueOut.StartLocation) < 501).First(), valueOut.StartLocation) < 501)
                                {

                                    startPointMatch = true;
                                }
                            }
                            catch (Exception)
                            {
                                //startPointMatch = false;
                                //continue;
                            }


                            //try
                            //{
                            //    if (StaticFunctions.CalculateDistanceBetweenPoints(item.RoutePoints.Where(p => StaticFunctions.CalculateDistanceBetweenPoints(p, valueOut.TargetLocation) < 501).First(), valueOut.TargetLocation) < 501)
                            //    {
                            //        targetPointMatch = true;
                            //    }
                            //}
                            //catch (Exception)
                            //{
                            //    //targetPointMatch = false;
                            //    //continue;
                            //}

                            if (startPointMatch)
                            {
                                returnRides.Add(item);
                            }
                            startPointMatch = false;
                        }

                        // check for contents in query before returning?
                        if (returnRides == null)
                        {
                            valueOut.Nickname = "Hakusi ei tuottanut tuloksia";
                            returnRides.Add(valueOut);
                        }
                        return returnRides;
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

        //[HttpPost]
        //public async Task<ActionResult<List<RideOut>>> SearchRidesCustomerAsync([FromBody]Ride valueIn)
        //{
        //    try //Searching Rides from CosmosDB with right TimeTable.

        //    {
        //        {
        //            //Functions for delayed response -- timeout try /catch



        //             // Get route from Google Directions Api
        //             var response = await GoogleApiFunctions.GetRouteGoogle(valueIn.StartAddress, valueIn.TargetAddress);

        //             // parse response from Google
        //             RootObject obj = JsonConvert.DeserializeObject<RootObject>(response);
        //             RideOut valueOut = new RideOut();


        //             if (obj.status == "ZERO_RESULTS")
        //             {
        //                 return NoContent();// "Reittiä ei löytynyt. Tarkista antamasi osoitteet, tai kokeile hakea kaupunginosalla.";
        //             }
        //             else if (obj.status == "OK")
        //             {
        //                 // parse incoming object to outgoing  start and end point from Google to CosmosDB -object
        //                 valueOut.Nickname = valueIn.Nickname;
        //                 valueOut.Price = valueIn.Price;
        //                 valueOut.StartTime = valueIn.StartTime;
        //                 valueOut.EndTime = valueIn.EndTime;
        //                 valueOut.StartAddress = valueIn.StartAddress;

        //                 // lat and lng intentionally the wrong way around. don't fix!
        //                 valueOut.StartLocation = new Point(obj.routes[0].legs[0].start_location.lat, obj.routes[0].legs[0].start_location.lng);
        //                 valueOut.TargetAddress = valueIn.TargetAddress;
        //                 valueOut.TargetLocation = new Point(obj.routes[0].legs[0].end_location.lat, obj.routes[0].legs[0].end_location.lng);


        //                 //foreach (var location in obj.routes[0].legs[0].steps)
        //                 //{
        //                 //    valueOut.RoutePoints.Add(new Point(location.end_location.lng, location.end_location.lat));

        //                 //}
        //                 valueOut.OfferingRide = valueIn.OfferingRide;
        //                 valueOut.SeatsLeft = valueIn.SeatsLeft;
        //                 valueOut.MondayFrequency = valueIn.MondayFrequency;
        //                 valueOut.TuesdayFrequency = valueIn.TuesdayFrequency;
        //                 valueOut.WednesdayFrequency = valueIn.WednesdayFrequency;
        //                 valueOut.ThursdayFrequency = valueIn.ThursdayFrequency;
        //                 valueOut.FridayFrequency = valueIn.FridayFrequency;
        //                 valueOut.SaturdayFrequency = valueIn.SaturdayFrequency;
        //                 valueOut.SundayFrequency = valueIn.SundayFrequency;

        //                 // How to check if document == created?
        //                 Document document = await _cosmosDBclient.CreateDocumentAsync(
        //                 UriFactory.CreateDocumentCollectionUri(_dbName, _collectionName),
        //                 valueOut);

        //                 // search for matches
        //                 FeedOptions queryOptions = new FeedOptions { MaxItemCount = -1 };
        //                 IQueryable<RideOut> query = _cosmosDBclient.CreateDocumentQuery<RideOut>(
        //                 rideCollectionUri, queryOptions).Where(f => f.OfferingRide == true && f.StartTime >= valueOut.StartTime && f.StartTime <= valueOut.EndTime && f.StartLocation.Distance(valueOut.StartLocation) < 500 && f.TargetLocation.Distance(valueOut.TargetLocation) < 500); // Distance (to) etäisyys metreinä

        //                 // check for contents in query before returning?

        //                 return query.ToList();
        //             }

        //             else
        //             {
        //                 return NoContent();// "Nyt kävi jotain.";
        //             }
        //         }
        //     }

        //     catch (DocumentClientException de)
        //     {
        //         switch (de.StatusCode.Value)
        //         {
        //             case System.Net.HttpStatusCode.NotFound:
        //                 return NotFound();
        //         }
        //     }
        //     return BadRequest();

        // }
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
        public async Task<ActionResult<RideOut>> PostOfferRideAsync([FromBody] Ride valueIn)
        {
            //Functions for delayed response -- timeout try /catch

            // Get route from Google Directions Api
            var response = await GoogleApiFunctions.GetRouteGoogle(valueIn.StartAddress, valueIn.TargetAddress);
            // parse response
            RootObject obj = JsonConvert.DeserializeObject<RootObject>(response);
            RideOut valueOut = new RideOut();


            if (obj.status == "ZERO_RESULTS")
            {
                return NotFound();
            }
            else if (obj.status == "OK")
            {
                // parse incoming object to outgoing  start and end point from Google to CosmosDB -object
                valueOut.Nickname = valueIn.Nickname;
                valueOut.Price = valueIn.Price;
                valueOut.OnBoard = new List<string>();
                foreach (var i in valueIn.OnBoard)
                {
                    valueOut.OnBoard.Add(i);
                }

                DateTime UTCDateTime = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Local);
                UTCDateTime = valueIn.StartTime;
                valueOut.StartTime = UTCDateTime;
                
                if (valueIn.EndTime != null)
                {
                    valueOut.EndTime = valueIn.EndTime;
                }
                valueOut.StartAddress = valueIn.StartAddress;
                // lat and lng intentionally the wrong way around. don't fix!
                valueOut.StartLocation = new Point(obj.routes[0].legs[0].start_location.lng, obj.routes[0].legs[0].start_location.lat);
                valueOut.TargetAddress = valueIn.TargetAddress;
                valueOut.TargetLocation = new Point(obj.routes[0].legs[0].end_location.lng, obj.routes[0].legs[0].end_location.lat);
                valueOut.RoutePoints = new List<Point>();
                foreach (var location in obj.routes[0].legs[0].steps)
                {
                    valueOut.RoutePoints.Add(new Point(location.end_location.lng, location.end_location.lat));
                }
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
                
                return Ok(document.Id);
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpPut]
        public async Task<string> JoinTheRideAsync(string Id, int seatsLeft, string nick)
        {       //Updating seats to database
            try
            {
                //Fetch the Document to be updated
                Document doc = _cosmosDBclient.CreateDocumentQuery<Document>(rideCollectionUri)
                                            .Where(r => r.Id == Id)
                                            .AsEnumerable()
                                            .SingleOrDefault();              
                int updatedSeats = seatsLeft;
                updatedSeats--;

                var lista = doc.GetPropertyValue<List<string>>("OnBoard");
                lista.Add(nick);
                Trace.WriteLine(lista);
                lista.ForEach(i => Trace.WriteLine(i));
                //Update some properties on the found resource
                doc.SetPropertyValue("SeatsLeft", updatedSeats);
                doc.SetPropertyValue("OnBoard", lista);
                

                //Tähän pitää lisätä vielä reitin pituuden nousu tarvittaessa!    -+

                //Now persist these changes to the database by replacing the original resource
                Document updated = await _cosmosDBclient.ReplaceDocumentAsync(doc);

                return "Olet ilmoittautunut mukaan kyytiin.";
            }
            catch (DocumentClientException de)
            {
                switch (de.StatusCode.Value)
                {
                    case System.Net.HttpStatusCode.NotFound:
                        return "Nyt ei löytynyt kyytiä, koita uudelleen.";
                }
            }
            return "Olisikohan joku mennyt vikaan?";
        }

        [HttpPut]
        public async Task<string> EditRideAsync(string id, double price, int seatsleft, DateTime startTime, DateTime endTime, string start, string end)
        {
            try //Editing the Ride
            {
                Document doc = _cosmosDBclient.CreateDocumentQuery<Document>(rideCollectionUri)
                                       .Where(r => r.Id == id)
                                       .AsEnumerable()
                                       .SingleOrDefault();

                doc.SetPropertyValue("Price", price);
                doc.SetPropertyValue("SeatsLeft", seatsleft);
                doc.SetPropertyValue("StartTime", startTime);
                doc.SetPropertyValue("EndTime", endTime);
                doc.SetPropertyValue("StartAddress", start);
                doc.SetPropertyValue("EndAddress", end);

                Document updated = await _cosmosDBclient.ReplaceDocumentAsync(doc);

                return updated.ToString();

            }
            catch (DocumentClientException de)
            {
                switch (de.StatusCode.Value)
                {
                    case System.Net.HttpStatusCode.NotFound:
                        return "Nyt täytyy kokeilla uudelleen!";
                }
            }
            return "Joku meni vikaan!";
        }
        [HttpGet]
        public async Task<ActionResult<RideOut>> GetByDocumentIdAsync (string documentId)
        {
            try
            {
                RideOut customer = await _cosmosDBclient.ReadDocumentAsync<RideOut>(
                 UriFactory.CreateDocumentUri(_dbName, _collectionName, documentId));
                return Ok(customer);
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