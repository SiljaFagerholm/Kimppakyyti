using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KimppakyytiApi.Models
{
    public class User
    {
        public string Nickname { get; set; }       
        public string FirstName { get; set; }

        public string LastName { get; set; }
        public string Email { get; set; }

        public int Phonenumber { get; set; }
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
        public static User FromJson(string json)
        {
            return JsonConvert.DeserializeObject<User>(json);
        }
    }
}
