using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DanceSchoolPortalApi.Models
{
    public class CourseLevel
    {
        public Guid CourseId { get; set; }
        public Guid LevelId { get; set; }
    }
}