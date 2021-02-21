using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DanceSchoolPortalApi.Models
{
    public class ClientGroup
    {
        public Guid StudyGroupId { get; set; }
        public Guid ClientId { get; set; }
    }
}