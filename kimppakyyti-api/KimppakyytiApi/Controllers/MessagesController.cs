using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents.Client;
using Microsoft.Extensions.Configuration;

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

        public IActionResult Index()
        {
            return View();
        }
    }
}