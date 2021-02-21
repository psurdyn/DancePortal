using DanceSchoolPortalApi.DataAccess;
using DanceSchoolPortalApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DanceSchoolPortalApi.Controllers
{
    [Authorize]
    [RoutePrefix("level")]
    public class LevelController : ApiController
    {
        private string _connString;
        private SqlDataAccess _sqlDA;

        public LevelController()
        {
            _sqlDA = new SqlDataAccess();
            _connString = _sqlDA.GetConnectionString("MyConnection");
        }

        [Route("all")]
        [HttpGet]
        [AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            try
            {
                var levels = _sqlDA.LoadData<Level, dynamic>("dbo.spLevels_GetAll", new { });

                return Ok(levels);
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }


    }
}
