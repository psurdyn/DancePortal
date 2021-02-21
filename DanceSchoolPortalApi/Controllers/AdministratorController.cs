using DanceSchoolPortalApi.DataAccess;
using DanceSchoolPortalApi.Models;
using DanceSchoolPortalApi.ModelsDto;
using Swashbuckle.Swagger.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DanceSchoolPortalApi.Controllers
{
    [Authorize(Roles = "Administrator")]
    [RoutePrefix("administrator")]
    public class AdministratorController : ApiController
    {
        private ISqlDataAccess _sqlDA;
        private string _connString;

        public AdministratorController(ISqlDataAccess sqlDataAccess)
        {
            _sqlDA = sqlDataAccess;
            _connString = _sqlDA.GetConnectionString("MyConnection");
        }

        [Route("{id}")]
        [HttpGet]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult Get(Guid id)
        {
            try
            {
                var admin = _sqlDA.LoadData<Administrator, dynamic>("dbo.spAdministrators_Get", new { PersonId = id})
                    .FirstOrDefault();

                if(admin == null)
                {
                    return NotFound();
                }

                return Ok(admin);
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("add")]
        [SwaggerResponse(HttpStatusCode.Created)]
        [SwaggerResponse(HttpStatusCode.BadRequest)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult Add([FromBody]AdministratorDto administrator)
        {
            try
            {
                if(administrator == null || administrator.PersonId == null)
                {
                    return BadRequest("Passed administrator is null!!");
                }

                _sqlDA.SaveData<AdministratorDto>("dbo.spAdministrators_Add", administrator);

                return StatusCode(HttpStatusCode.Created);
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
