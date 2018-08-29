using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KimppakyytiApi.Models
{
    public class AppUser
    {
        [Newtonsoft.Json.JsonProperty(PropertyName = "id")]
        public virtual string Id { get; set; }
        public string Nickname { get; set; }       
        public string FirstName { get; set; }

        public string LastName { get; set; }
        public string Email { get; set; }

        public string Phonenumber { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
      

        public override string ToString()
        {
            return $"Nickname: {Nickname} Firstname: {FirstName} Lastname: {LastName} Email: {Email} Phonenumber: {Phonenumber} Address: " +
                $"{Address} City: {City} ";
        }
        public string ToJson()
        {
            return JsonConvert.SerializeObject(this);
        }
        public static AppUser FromJson(string json)
        {
            return JsonConvert.DeserializeObject<AppUser>(json);
        }
    }
}
