using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace KimppakyytiApi.Models
{
    public class GoogleApiFunctions
    {
        private readonly IConfiguration _configuration;
        private  static string GoogleKey;
        public GoogleApiFunctions(IConfiguration configuration)
        {
            _configuration = configuration;           
            GoogleKey = _configuration["ConnectionStrings:GoogleKey"];           
        }
        private readonly static HttpClient _googleClient = new HttpClient();
        public static async Task<string> GetRouteGoogle(string from, string to)
        {
            string response = await _googleClient.GetStringAsync($"https://maps.googleapis.com/maps/api/directions/json?origin={from}&destination={to}&key=" + GoogleKey);
            return response;
        }
    }
}
