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
    [Authorize]
    [RoutePrefix("owner")]
    public class OwnerController : ApiController
    {
        private string _connString;
        private SqlDataAccess _sqlDA;

        public OwnerController()
        {
            _sqlDA = new SqlDataAccess();
            _connString = _sqlDA.GetConnectionString("MyConnection");
        }

        [Route("{id}")]
        [HttpGet]
        [Authorize(Roles = "Administrator,DanceSchool")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult Get(Guid id)
        {
            try
            {
                var owner = _sqlDA.LoadData<Owner, dynamic>("dbo.spOwners_GetById", new { PersonId = id})
                    .FirstOrDefault();

                if(owner == null)
                {
                    return NotFound();
                }

                return Ok(owner);
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("all")]
        [HttpGet]
        [Authorize(Roles = "Administrator,DanceSchool")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult GetAll()
        {
            try
            {
                var owners = _sqlDA.LoadData<Owner, dynamic>("dbo.spOwners_GetAll", new { });

                return Ok(owners);
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("add")]
        [HttpPost]
        [SwaggerResponse(HttpStatusCode.Created)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult Add([FromBody]OwnerDto owner)
        {
            try
            {
                _sqlDA.SaveData<OwnerDto>("dbo.spOwners_Add", owner);

                return StatusCode(HttpStatusCode.Created);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
