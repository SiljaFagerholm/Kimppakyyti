using System;
using Microsoft.Azure.Documents.Spatial;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KimppakyytiApi.Models.RouteLogic
{
    public class StaticFunctions
    {
        public static double CalculateDistanceBetweenPoints(Point first, Point second)
        {

            var lat1 = first.Position.Latitude;
            var lat2 = second.Position.Latitude;
            var lon1 = first.Position.Longitude;
            var lon2 = second.Position.Longitude;

            var R = 6371e3; // metres
            var φ1 = lat1 * Math.PI / 180;
            var φ2 = lat2 * Math.PI / 180;
            var Δφ = (lat2 - lat1) * Math.PI / 180;
            var Δλ = (lon2 - lon1) * Math.PI / 180;

            var a = Math.Sin(Δφ / 2) * Math.Sin(Δφ / 2) +
                    Math.Cos(φ1) * Math.Cos(φ2) *
                    Math.Sin(Δλ / 2) * Math.Sin(Δλ / 2);

            var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

            var d = R * c;

            return d; //returns the distance of two points in metres
        }
    }
}
