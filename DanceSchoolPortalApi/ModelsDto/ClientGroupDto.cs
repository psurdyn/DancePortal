using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DanceSchoolPortalApi.ModelsDto
{
    public class ClientGroupDto
    {
        public Guid StudyGroupId { get; set; }
        public Guid ClientId { get; set; }
    }
}