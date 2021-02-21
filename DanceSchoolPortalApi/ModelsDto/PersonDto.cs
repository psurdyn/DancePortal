using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DanceSchoolPortalApi.ModelsDto
{
    public class PersonDto
    {
        [JsonProperty("AspNetUserId")]
        public string AspNetUserId { get; set; }
        [JsonProperty("Email")]
        public string Email { get; set; }
        [JsonProperty("FirstName")]
        public string FirstName { get; set; }
        [JsonProperty("LastName")]
        public string LastName { get; set; }
        [JsonProperty("Sex")]
        public string Sex { get; set; }
        [JsonProperty("TelephoneNumber")]
        public string TelephoneNumber { get; set; }
    }
}