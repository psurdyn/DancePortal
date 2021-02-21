using DanceSchoolPortalApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DanceSchoolPortalApi.ViewModels
{
    public class ClientGroupViewModel
    {
        public Client Client{ get; set; }
        public StudyGroup StudyGroup { get; set; }
    }
}