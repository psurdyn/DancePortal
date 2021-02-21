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
using System.Web.Http.Description;

namespace DanceSchoolPortalApi.Controllers
{
    [Authorize]
    [RoutePrefix("school")]
    public class SchoolController : ApiController
    {
        private string _connString;
        private SqlDataAccess _sqlDA;

        public SchoolController()
        {
            _sqlDA = new SqlDataAccess();
            _connString = _sqlDA.GetConnectionString("MyConnection");
        }

        [Route("{id}")]
        [HttpGet]
        [AllowAnonymous]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult Get(Guid id)
        {
            try
            {
                var school = _sqlDA.LoadData<School, dynamic>("dbo.spSchools_GetById", new { Id = id})
                    .FirstOrDefault();

                if(school == null)
                {
                    return NotFound();
                }

                return Ok(school);
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("byName/{name}")]
        [HttpGet]
        [AllowAnonymous]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult GetByName(string name)
        {
            try
            {
                var school = _sqlDA.LoadData<School, dynamic>("dbo.spSchools_GetByName", new { Name = name})
                    .FirstOrDefault();

                if(school == null)
                {
                    return NotFound();
                }

                return Ok(school);
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("all")]
        [HttpGet]
        [AllowAnonymous]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult GetAll()
        {
            try
            {
                var schools = _sqlDA.LoadData<School, dynamic>("dbo.spSchools_GetAll", new { });

                return Ok(schools);
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("add")]
        [HttpPost]
        [Authorize(Roles = "Administrator,DanceSchool")]
        [SwaggerResponse(HttpStatusCode.Created)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult Add(SchoolDto school)
        {
            try
            {
                var insertedRow = (IDictionary<string, object>)_sqlDA.SaveData<dynamic>("dbo.spSchools_Add",
                    new { school.City, school.CreationDate, school.Description, school.EmailAddress, school.Name, school.PostalCode, school.Street, school.TelephoneNumber, school.WebAddress });
                insertedRow.TryGetValue("Id", out object insertedId);

                return Created<string>("", insertedId?.ToString());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("remove/{id}")]
        [HttpDelete]
        [Authorize(Roles = "Administrator")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult Remove([FromUri]Guid id)
        {
            try
            {
                _sqlDA.SaveData<dynamic>("dbo.spSchools_Remove", new { Id = id });

                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
