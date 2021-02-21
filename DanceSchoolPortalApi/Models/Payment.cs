using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DanceSchoolPortalApi.Models
{
    public class Payment
    {
        public Guid Id { get; set; }
        public string KindOfPayment { get; set; }
    }
}