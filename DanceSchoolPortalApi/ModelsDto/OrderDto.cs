using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DanceSchoolPortalApi.ModelsDto
{
    public class OrderDto
    {
        public Guid ClientId { get; set; }
        public decimal WholeAmount { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal Discount { get; set; }
    }
}