using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DanceSchoolPortalApi.ModelsDto
{
    public class CourseDto
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public Guid KindOfDanceId { get; set; }
        public Guid SchoolId { get; set; }
    }
}