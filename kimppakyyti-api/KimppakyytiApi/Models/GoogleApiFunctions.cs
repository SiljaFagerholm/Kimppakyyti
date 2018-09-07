using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace KimppakyytiApi.Models
{
    public class GoogleApiFunctions
    {
        private readonly IConfiguration _configuration;
        //private  static string GoogleKey;
        private static readonly string googleKey = ConfigurationManager.AppSettings["GoogleKey"];


        public GoogleApiFunctions(IConfiguration configuration)
        {
            _configuration = configuration;           
            var google = _configuration["ConnectionStrings:GoogleKey"];
            google = Environment.GetEnvironmentVariable("APPSETTING_PrimaryKey");

        }
        private readonly static HttpClient _googleClient = new HttpClient();
        public static async Task<string> GetRouteGoogle(string from, string to)
        {

            string response = await _googleClient.GetStringAsync($"https://maps.googleapis.com/maps/api/directions/json?origin={from}&destination={to}&key=" + googleKey);

            return response;
        }

        public static async Task<string> GetPlaceGoogle(string from)
        {
            string response = await _googleClient.GetStringAsync($"https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input={from}&fields=name,geometry&inputtype=textquery&key=" + googleKey);
            return response;
        }
    }
}
