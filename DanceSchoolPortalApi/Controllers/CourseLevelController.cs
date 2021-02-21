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
    [RoutePrefix("courseLevel")]
    public class CourseLevelController : ApiController
    {
        private string _connString;
        private SqlDataAccess _sqlDA;

        public CourseLevelController()
        {
            _sqlDA = new SqlDataAccess();
            _connString = _sqlDA.GetConnectionString("MyConnection");
        }

        [HttpGet]
        [Route("{courseId}")]
        [AllowAnonymous]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult Get(Guid courseId)
        {
            try
            {
                var courseLevel = _sqlDA.LoadData<CourseLevel, dynamic>("dbo.spCourseLevels_GetById", new { CourseId = courseId})
                    .FirstOrDefault();

                if(courseLevel == null)
                {
                    return NotFound();
                }

                return Ok(courseLevel);
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        //[HttpGet]
        //[Route("byName/{name}")]
        //[AllowAnonymous]
        //[SwaggerResponse(HttpStatusCode.OK)]
        //[SwaggerResponse(HttpStatusCode.NotFound)]
        //[SwaggerResponse(HttpStatusCode.InternalServerError)]
        //public IHttpActionResult GetByName(string name)
        //{
        //    try
        //    {
        //        var courseLevel = _sqlDA.LoadData<CourseLevel, dynamic>("dbo.spCourseLevels_GetByName", new { Name = name})
        //            .FirstOrDefault();

        //        if(courseLevel == null)
        //        {
        //            return NotFound();
        //        }

        //        return Ok(courseLevel);
        //    }
        //    catch(Exception ex)
        //    {
        //        return InternalServerError(ex);
        //    }
        //}

        [AllowAnonymous]
        [HttpGet]
        [Route("all")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult GetAll()
        {
            try
            {
                var courseLevels = _sqlDA.LoadData<CourseLevel, dynamic>("dbo.spCourseLevels_GetAll", new { });

                return Ok(courseLevels);
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Authorize(Roles = "Administrator,DanceSchool,DanceInstructor")]
        [Route("add")]
        [SwaggerResponse(HttpStatusCode.Created)]
        [SwaggerResponse(HttpStatusCode.BadRequest)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult Add([FromBody]CourseLevelDto courseLevel)
        {
            if(courseLevel != null)
            {
                try
                {
                    _sqlDA.SaveData<CourseLevelDto>("dbo.spCourseLevels_Add", courseLevel);

                    return StatusCode(HttpStatusCode.Created);
                }
                catch (Exception ex)
                {
                    return InternalServerError(ex);
                }
            }
            else
            {
                return BadRequest("CourseLevel is null!");
            }
        }

        [HttpPost]
        [Authorize(Roles = "Administrator,DanceSchool,DanceInstructor")]
        [Route("remove")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.BadRequest)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult Remove(CourseLevel courseLevel)
        {
            if (courseLevel == null || courseLevel.CourseId == null)
                return BadRequest("Passed courseId is null");

            try
            {
                _sqlDA.SaveData<CourseLevel>("dbo.spCourseLevels_Remove", courseLevel);

                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
