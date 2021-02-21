using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DanceSchoolPortalApi.Models
{
    public class Person
    {
        public Guid Id { get; set; }
        public string AspNetUserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Sex { get; set; }
        public string TelephoneNumber { get; set; }
    }
}