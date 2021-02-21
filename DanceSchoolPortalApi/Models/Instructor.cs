using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DanceSchoolPortalApi.Models
{
    public class Instructor
    {
        public Guid Id { get; set; }
        public Guid PersonId { get; set; }
    }
}