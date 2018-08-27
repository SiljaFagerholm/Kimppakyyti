using KimppakyytiApi.Models.RouteLogic;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Documents.Spatial;

namespace KimppakyytiApi.Models
{
    public class RideOut
    {
        public string Nickname { get; set; }
        public double Price { get; set; }
        
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }

        public string StartAddress { get; set; }

        [JsonProperty("startlocation")]
        public Point StartLocation { get; set; }
         
        public string TargetAddress { get; set; }
        [JsonProperty("targetlocation")]
        public Point TargetLocation { get; set; }
        //[JsonProperty("routepoints")]
        //public List<Point> RoutePoints { get; set; }
        
        public bool OfferingRide { get; set; }
        public int SeatsLeft { get; set; }
        public bool MondayFrequency { get; set; }
        public bool TuesdayFrequency { get; set; }
        public bool WednesdayFrequency { get; set; }
        public bool ThursdayFrequency { get; set; }
        public bool FridayFrequency { get; set; }
        public bool SaturdayFrequency { get; set; }
        public bool SundayFrequency { get; set; }
        
       
        
        public override string ToString()
        {
            return $"Nickname: {Nickname} Price: {Price} Start Time: {StartTime} End Time (?): {EndTime} Seats: {SeatsLeft} StartAddress: {StartAddress} TargetAddress: {TargetAddress} OfferingRide: {OfferingRide} Frequency: " +
                $"Monday: {MondayFrequency} Tuesday: {TuesdayFrequency} Wednesday: {WednesdayFrequency} Thursday: {ThursdayFrequency}" +
                $"Friday: {FridayFrequency} Saturday: {SaturdayFrequency} Sunday: {SundayFrequency}";
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
