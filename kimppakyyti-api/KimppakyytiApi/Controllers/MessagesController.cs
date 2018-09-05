using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Azure.Documents;
using KimppakyytiApi.Models;

namespace KimppakyytiApi.Controllers
{
    public class MessagesController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly DocumentClient _cosmosDBclient;
        private const string _dbName = "RideDB";
        private const string _collectionName = "Messages";
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
        public MessagesController(IConfiguration configuration)
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

        [HttpPost]
        public async Task<ActionResult<string>> Post ([FromBody] Message value)
        {
            Document document = await _cosmosDBclient.CreateDocumentAsync(UriFactory.CreateDocumentCollectionUri(_dbName, _collectionName), value);
            return Ok(document.Id);
        }

        [HttpGet]
        public string Ping()
        {
            return "Nyt on tehty collection, vaikka sitä ei oltu tehty aiemmin!";
        }
        [HttpGet]
        public ActionResult<List<Message>> GetAllMessages()
        {
            FeedOptions queryoptions = new FeedOptions { MaxItemCount = -1 };
            IQueryable<Message> query = _cosmosDBclient.CreateDocumentQuery<Message>(UriFactory.CreateDocumentCollectionUri(_dbName, _collectionName), "SELECT * FROM C");
            return Ok(query.ToList());
        }

        // GET api/messages/getbysenderid
        [HttpGet]
        public ActionResult<List<Message>> GetBySenderId(string id)
        {
            FeedOptions queryoptions = new FeedOptions { MaxItemCount = -1 };
            IQueryable<Message> query = _cosmosDBclient.CreateDocumentQuery<Message>(UriFactory
                .CreateDocumentCollectionUri(_dbName, _collectionName), $"SELECT * FROM c  WHERE CONTAINS(c.SenderId, '{id}')");


            return Ok(query.ToList());
        }
        // GET api/messages/getbyrecipientid
        [HttpGet]
        public ActionResult<List<Message>> GetByRecipientId(string id)
        {
            FeedOptions queryoptions = new FeedOptions { MaxItemCount = -1 };
            IQueryable<Message> query = _cosmosDBclient.CreateDocumentQuery<Message>(UriFactory
                .CreateDocumentCollectionUri(_dbName, _collectionName), $"SELECT * FROM c  WHERE CONTAINS(c.RecipientId, '{id}')");

            return Ok(query.ToList());
        }
        [HttpGet]
        public ActionResult<List<Message>> GetByRideId(string id)
        {
            FeedOptions queryoptions = new FeedOptions { MaxItemCount = -1 };
            IQueryable<Message> query = _cosmosDBclient.CreateDocumentQuery<Message>(UriFactory.CreateDocumentCollectionUri(_dbName, _collectionName),
                $"SELECT * FROM C WHERE CONTAINS(C.RideId, '{id}')");
            return Ok(query.ToList());
        }
        [HttpGet]
        public async Task<ActionResult<Message>> GetByDocumentId(string documentid)
        {
            try
            {
                Message message = await _cosmosDBclient.ReadDocumentAsync<Message>(UriFactory.CreateDocumentUri(_dbName, _collectionName, documentid));
                return Ok(message);
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
     public async Task<ActionResult<string>> Delete (string documentid)
        {
            try
            {
                await _cosmosDBclient.DeleteDocumentAsync(UriFactory.CreateDocumentUri(_dbName, _collectionName, documentid));
                return Ok($"Deleted message {documentid}");
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