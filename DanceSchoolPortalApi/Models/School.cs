﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DanceSchoolPortalApi.Models
{
    public class School
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Street { get; set; }
        public string EmailAddress { get; set; }
        public string WebAddress { get; set; }
        public string Description { get; set; }
        public string TelephoneNumber { get; set; }
    }
}