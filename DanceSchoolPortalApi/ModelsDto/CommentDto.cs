using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DanceSchoolPortalApi.ModelsDto
{
    public class CommentDto
    {
        public Guid ClientId { get; set; }
        public Guid SchoolId { get; set; }
        public string Text { get; set; }
    }
}