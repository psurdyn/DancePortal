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
    [RoutePrefix("instructor")]
    public class InstructorController : ApiController
    {
        private string _connString;
        private SqlDataAccess _sqlDA;

        public InstructorController()
        {
            _sqlDA = new SqlDataAccess();
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
                var instructor = _sqlDA.LoadData<Instructor, dynamic>("dbo.spInstructors_GetById", new { PersonId = id })
                    .FirstOrDefault();

                if (instructor == null)
                {
                    return NotFound();
                }

                return Ok(instructor);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("all")]
        [HttpGet]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult GetAll()
        {
            try
            {
                var instructors = _sqlDA.LoadData<Instructor, dynamic>("dbo.spInstructos_GetAll", new { });

                return Ok(instructors);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("add")]
        [HttpPost]
        [SwaggerResponse(HttpStatusCode.Created)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult Add([FromBody]InstructorDto instructor)
        {
            try
            {
                _sqlDA.SaveData<InstructorDto>("dbo.spInstructors_Add", instructor);

                return StatusCode(HttpStatusCode.Created);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
