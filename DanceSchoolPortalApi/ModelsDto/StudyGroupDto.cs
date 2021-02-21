using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DanceSchoolPortalApi.ModelsDto
{
    public class StudyGroupDto
    {
        public Guid InstructorId { get; set; }
        public Guid RoomId { get; set; }
        public Guid CourseId { get; set; }
        public Guid KindOfDanceId { get; set; }
        public Guid SchoolId { get; set; }
        public DateTime StartDate { get; set; }
    }
}