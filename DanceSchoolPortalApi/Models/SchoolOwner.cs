using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DanceSchoolPortalApi.Models
{
    public class SchoolOwner
    {
        public Guid SchoolId { get; set; }
        public Guid OwnerId { get; set; }
    }
}