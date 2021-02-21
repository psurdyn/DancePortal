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
    [RoutePrefix("studyGroup")]
    [Authorize]
    public class StudyGroupController : ApiController
    {
        private string _connString;
        private SqlDataAccess _sqlDA;

        public StudyGroupController()
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
                var studyGroup = _sqlDA.LoadData<StudyGroup, dynamic>("dbo.spStudyGroups_GetById", new { Id = id})
                    .FirstOrDefault();

                if(studyGroup == null)
                {
                    return NotFound();
                }

                return Ok(studyGroup);
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("byInstructor/{instructorId}")]
        [HttpGet]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult GetByInstructor(Guid instructorId)
        {
            try
            {
                var studyGroups = _sqlDA.LoadData<StudyGroup, dynamic>("dbo.spStudyGroups_GetByInstructor", new { InstructorId = instructorId});

                return Ok(studyGroups);
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("byCourse/{courseId}")]
        [HttpGet]
        [AllowAnonymous]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult GetByCourse(Guid courseId)
        {
            try
            {
                var studyGroups = _sqlDA.LoadData<StudyGroup, dynamic>("dbo.spStudyGroups_GetByCourse", new { CourseId = courseId});

                return Ok(studyGroups);
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
        public IHttpActionResult Add([FromBody]StudyGroupDto studyGroup)
        {
            try
            {
                _sqlDA.SaveData<StudyGroupDto>("dbo.spStudyGroups_Add", studyGroup);

                return StatusCode(HttpStatusCode.Created);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("remove/{id}")]
        [HttpDelete]
        [Authorize(Roles = "Administrator,DanceSchool")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult Remove([FromUri]Guid id)
        {
            try
            {
                _sqlDA.SaveData<dynamic>("dbo.spStudyGroups_Remove", new { Id = id });

                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}
