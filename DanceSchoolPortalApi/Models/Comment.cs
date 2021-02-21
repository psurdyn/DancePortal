using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DanceSchoolPortalApi.Models
{
    public class Comment
    {
        public Guid Id { get; set; }
        public Guid ClientId { get; set; }
        public Guid SchoolId { get; set; }
        public string Text { get; set; }
    }
}