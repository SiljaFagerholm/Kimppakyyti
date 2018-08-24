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
       
        public string StartAddress { get; set; }
        
        public decimal[] StartLocation { get; set; } 
        public string TargetAddress { get; set; }
        public decimal[] TargetLocation { get; set; } 
        public string RoutePoints { get; set; } 
        public bool OfferingRide { get; set; }
        public int SeatsLeft { get; set; }
        public bool MondayFrequency { get; set; }
        public bool TuesdayFrequency { get; set; }
        public bool WednesdayFrequency { get; set; }
        public bool ThursdayFrequency { get; set; }
        public bool FridayFrequency { get; set; }
        public bool SaturdayFrequency { get; set; }
        public bool SundayFrequency { get; set; }

        public Ride()
        {
            StartLocation = new decimal[2];
            TargetLocation = new decimal[2];
          
        }

        public override string ToString()
        {
            return $"Nickname: {Nickname} Price: {Price} When: {When} Seats: {SeatsLeft} StartAddress: {StartAddress} TargetAddress: {TargetAddress} OfferingRide: {OfferingRide} Frequency: " +
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
