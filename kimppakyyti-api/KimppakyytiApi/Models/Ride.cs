using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KimppakyytiApi.Models
{
    public class Ride
    {
        public string Nickname { get; set; }
        public double Price { get; set; }

        public DateTime When { get; set; }

        public string City { get; set; }
        public string Address { get; set; }
        public Dictionary<DateTime, bool> Frequency { get; set; }

        public override string ToString()
        {
            return $"Nickname: {Nickname} Price: {Price} When: {When} City: {City} Address: {Address}";
        }
        public string ToJson()
        {
            return JsonConvert.SerializeObject(this);
        }
        public static Ride FromJson(string json)
        {
            return JsonConvert.DeserializeObject<Ride>(json);
        }
    }
}
