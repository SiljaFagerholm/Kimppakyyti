using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KimppakyytiApi.Models
{
    public class Message
    {
        public string id { get; set; }
        public string Subject { get; set; }
        public string MessageText { get; set; }
        public string SenderId { get; set; }
        public string RecipientId { get; set; }
        public DateTime SendDate { get; set; }
        public string RideId { get; set; }

    }
}
