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
using System.Web.Http.Results;

namespace DanceSchoolPortalApi.Controllers
{
    [Authorize]
    [RoutePrefix("course")]
    public class CourseController : ApiController
    {
        private string _connString;
        private SqlDataAccess _sqlDA;

        public CourseController()
        {
            _sqlDA = new SqlDataAccess();
            _connString = _sqlDA.GetConnectionString("MyConnection");
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        public IHttpActionResult GetById(Guid id)
        {
            var course = _sqlDA.LoadData<Course, dynamic>("dbo.spCourses_GetById", new { Id = id })
                .FirstOrDefault();

            if (course == null)
            {
                return NotFound();
            }

            return Ok(course);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("all")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult GetAll()
        {
            try
            {
                var courses = _sqlDA.LoadData<Course, dynamic>("dbo.spCourses_GetAll", new { });

                return Ok(courses);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }

        [Route("add")]
        [HttpPost]
        [Authorize(Roles = "Administrator,DanceSchool")]
        [SwaggerResponse(HttpStatusCode.Created)]
        [SwaggerResponse(HttpStatusCode.BadRequest)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult Add(CourseDto course)
        {
            try
            {
                if (course == null)
                {
                    return BadRequest("Passed coursed object is null!");
                }

                var insertedRow = (IDictionary<string, object>)_sqlDA.SaveData<dynamic>("dbo.spCourses_Add",
                    new { KindOfDanceId = course.KindOfDanceId, Name = course.Name, Price = course.Price, SchoolId = course.SchoolId });
                insertedRow.TryGetValue("Id", out object insertedId);

                return Created<string>("", insertedId?.ToString());

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }



        /*
                [HttpPost]
                [Authorize(Roles = "Administrator,DanceSchool")]
                [Route("remove")]
                [SwaggerResponse(HttpStatusCode.OK)]
                [SwaggerResponse(HttpStatusCode.BadRequest)]
                [SwaggerResponse(HttpStatusCode.InternalServerError)]
                public IHttpActionResult RemoveById(Course course)
                {
                    if (course.Id == null)
                        return BadRequest("Passed id is null");

                    try
                    {
                        _sqlDA.SaveData<dynamic>("dbo.spCourses_Remove", course);

                        return Ok();
                    }
                    catch(Exception ex)
                    {
                        return InternalServerError(ex);
                    }
                }
        */
        [Route("remove/{id}")]
        [HttpDelete]
        [Authorize(Roles = "Administrator,DanceSchool")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.BadRequest)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult Remove([FromUri] Guid id)
        {
            try
            {
                _sqlDA.SaveData<dynamic>("dbo.spCourses_Remove", new { Id = id });

                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
