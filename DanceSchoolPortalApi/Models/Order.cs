using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DanceSchoolPortalApi.Models
{
    public class Order
    {
        public Guid Id { get; set; }
        public Guid ClientId { get; set; }
        public decimal WholeAmount { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal Discount { get; set; }
        public Guid PaymentId { get; set; }
    }
}