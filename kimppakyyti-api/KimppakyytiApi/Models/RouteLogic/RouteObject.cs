using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KimppakyytiApi.Models.RouteLogic
{

    public class RootObject
    {
        [JsonProperty("results")]
        public List<GeocodedWaypoint> geocoded_waypoints { get; set; }
        public List<Route> routes { get; set; }
        public string status { get; set; }
    }

    public class GeocodedWaypoint
    {
        [JsonProperty("geocodedwaypoint")]
        public string geocoder_status { get; set; }
        public bool partial_match { get; set; }
        public string place_id { get; set; }
        public List<string> types { get; set; }
    }

    public class Northeast
    {
        [JsonProperty("northeast")]
        public double fakeNews { get; set; }

        public double lng { get; set; }
        public double lat { get; set; }
    }

    public class Southwest
    {
        [JsonProperty("southwest")]
        public double fakeNews { get; set; }
        public double lng { get; set; }
        public double lat { get; set; }
    }

    public class Bounds
    {
        [JsonProperty("bounds")]
        public Northeast northeast { get; set; }
        public Southwest southwest { get; set; }
    }

    public class Distance
    {
        [JsonProperty("distance")]
        public string text { get; set; }
        public int value { get; set; }
    }

    public class Duration
    {
        [JsonProperty("duration")]
        public string text { get; set; }
        public int value { get; set; }
    }

    public class EndLocation
    {
        [JsonProperty("endlocation")]
        public double fakeNews { get; set; }
        public double lng { get; set; }
        public double lat { get; set; }
    }

    public class StartLocation
    {
        [JsonProperty("startlocation")]
        public double fakeNews { get; set; }
        public double lng { get; set; }
        public double lat { get; set; }
    }

    public class Distance2
    {
        [JsonProperty("distance2")]
        public string text { get; set; }
        public int value { get; set; }
    }

    public class Duration2
    {
        [JsonProperty("duration2")]
        public string text { get; set; }
        public int value { get; set; }
    }

    public class EndLocation2
    {
        [JsonProperty("endlocation2")]
        public double fakeNews { get; set; }
        public double lng { get; set; }
        public double lat { get; set; }
    }

    public class Polyline
    {
        [JsonProperty("polyline")]
        public double fakeNews { get; set; }
        public string points { get; set; }
    }

    public class StartLocation2
    {
        [JsonProperty("startlocation2")]
        public double fakeNews { get; set; }
        public double lng { get; set; }
        public double lat { get; set; }
    }

    public class Step
    {
        [JsonProperty("step")]
        public Distance2 distance { get; set; }
        public Duration2 duration { get; set; }
        public EndLocation2 end_location { get; set; }
        public string html_instructions { get; set; }
        public Polyline polyline { get; set; }
        public StartLocation2 start_location { get; set; }
        public string travel_mode { get; set; }
        public string maneuver { get; set; }
    }

    public class Leg
    {
        [JsonProperty("leg")]
        public Distance distance { get; set; }
        public Duration duration { get; set; }
        public string end_address { get; set; }
        public EndLocation end_location { get; set; }
        public string start_address { get; set; }
        public StartLocation start_location { get; set; }
        public List<Step> steps { get; set; }
        public List<object> traffic_speed_entry { get; set; }
        public List<object> via_waypoint { get; set; }
    }

    public class OverviewPolyline
    {
        [JsonProperty("overviewpolyline")]
        public double fakeNews { get; set; }
        public string points { get; set; }
    }

    public class Route
    {
        [JsonProperty("route")]
        public Bounds bounds { get; set; }
        public string copyrights { get; set; }
        public List<Leg> legs { get; set; }
        public OverviewPolyline overview_polyline { get; set; }
        public string summary { get; set; }
        public List<object> warnings { get; set; }
        public List<object> waypoint_order { get; set; }
    }
}


