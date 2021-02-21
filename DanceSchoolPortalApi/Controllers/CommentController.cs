using DanceSchoolPortalApi.DataAccess;
using DanceSchoolPortalApi.Models;
using DanceSchoolPortalApi.ModelsDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DanceSchoolPortalApi.Controllers
{
    [RoutePrefix("comment")]
    public class CommentController : ApiController
    {
        private ISqlDataAccess _sqlDA;
        private string _connString;

        public CommentController(ISqlDataAccess sqlDataAccess)
        {
            _sqlDA = sqlDataAccess;
            _connString = _sqlDA.GetConnectionString("MyConnection");
        }

        [Route("{id}")]
        [HttpGet]
        public IHttpActionResult Get(Guid id)
        {
            try
            {
                var comment = _sqlDA.LoadData<Comment, dynamic>("dbo.spComments_Get", new { Id = id }).SingleOrDefault();
                if (comment == null)
                    return NotFound();

                return Ok(comment);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("client/{clientId}")]
        [HttpGet]
        public IHttpActionResult GetByClient(Guid clientId)
        {
            try
            {
                string[] emptyStringArray = new string[0];
                var comments = _sqlDA.LoadData<Comment, dynamic>("dbo.spComments_GetByClient", new { ClientId = clientId });
                if (comments == null || comments.Count == 0)
                    return Ok(emptyStringArray);

                return Ok(comments);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("school/{schoolId}")]
        [HttpGet]
        public IHttpActionResult GetBySchool(Guid schoolId)
        {
            try
            {
                string[] emptyStringArray = new string[0];
                var comments = _sqlDA.LoadData<Comment, dynamic>("dbo.spComments_GetBySchool", new { SchoolId = schoolId });
                if (comments == null || comments.Count == 0)
                    return Ok(emptyStringArray);

                return Ok(comments);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("all")]
        [HttpGet]
        public IHttpActionResult GetAll()
        {
            try
            {
                var comments = _sqlDA.LoadData<Comment, dynamic>("dbo.spComments_GetAll", new { });

                return Ok(comments);
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("add")]
        [Authorize]
        [HttpPost]
        public IHttpActionResult Add([FromBody] CommentDto comment)
        {
            try
            {
                _sqlDA.SaveData<CommentDto>("dbo.spComments_Add", comment);

                return StatusCode(HttpStatusCode.Created);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("delete/{id}")]
        [Authorize]
        [HttpDelete]
        public IHttpActionResult Delete([FromUri] Guid id)
        {
            try
            {
                _sqlDA.SaveData<dynamic>("dbo.spComments_Remove", new { Id = id });

                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
