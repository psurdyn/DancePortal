using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DanceSchoolPortalApi.ModelsDto
{
    public class SchoolOwnerDto
    {
        public Guid SchoolId { get; set; }
        public Guid OwnerId { get; set; }
    }
}