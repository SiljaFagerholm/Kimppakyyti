using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Extensions.Configuration;

namespace KimppakyytiApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly DocumentClient _client;
        private const string _dbName = "UserDB";
        private const string _collectionName = "User";

        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
            var endpointUri =
            _configuration["ConnectionStrings:CosmosDBConnection:EndpointUri"];
            var key =
            _configuration["ConnectionStrings:CosmosDBConnection:PrimaryKey"];
            _client = new DocumentClient(new Uri(endpointUri), key);
            _client.CreateDatabaseIfNotExistsAsync(new Database
            {
                Id = _dbName
            }).Wait();
            
            _client.CreateDocumentCollectionIfNotExistsAsync(
            UriFactory.CreateDatabaseUri(_dbName),
            new DocumentCollection { Id = _collectionName });
        }

        [HttpGet]
        public string Ping()
        {
            return "Nyt on tehty collection, vaikka sitä ei oltu tehty aiemmin!";
        }
        [HttpPost]
        public async Task<ActionResult<string>> Post([FromBody] Models.User value)
        {
            Document document = await _client.CreateDocumentAsync(
          UriFactory.CreateDocumentCollectionUri(_dbName, _collectionName),
          value);
            return Ok(document.Id);
        }
        [HttpGet]
        public ActionResult<List<Models.User>> GetAllUsers()
        {
            try
            {
                FeedOptions queryOptions = new FeedOptions { MaxItemCount = -1 };
                IQueryable<Models.User> query = _client.CreateDocumentQuery<Models.User>(
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
        [HttpGet]
        public async Task<ActionResult<Models.User>> GetUserByDocumentId(string documentId)
        {
            try
            {
                Models.User user = await _client.ReadDocumentAsync<Models.User>(UriFactory.CreateDocumentUri(
                    _dbName, _collectionName, documentId));
                return Ok(user);
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