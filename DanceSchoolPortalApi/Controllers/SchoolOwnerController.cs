using DanceSchoolPortalApi.DataAccess;
using DanceSchoolPortalApi.Models;
using DanceSchoolPortalApi.ModelsDto;
using Swashbuckle.Swagger.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web;
using System.Web.Http;

namespace DanceSchoolPortalApi.Controllers
{
    [Authorize]
    [RoutePrefix("schoolOwner")]
    public class SchoolOwnerController : ApiController
    {
        private string _connString;
        private SqlDataAccess _sqlDA;

        public SchoolOwnerController()
        {
            _sqlDA = new SqlDataAccess();
            _connString = _sqlDA.GetConnectionString("MyConnection");
        }

        //TODO: Add authorize to these two endpoints
        [Route("owner/{ownerId}")]
        [HttpGet]
        [SwaggerResponse(HttpStatusCode.OK)]
        public IHttpActionResult GetSchoolsByOwner([FromUri] Guid ownerId)
        {
            var ownerSchools = _sqlDA.LoadData<SchoolOwner, dynamic>("dbo.spSchoolOwners_GetSchoolsByOwner", new { OwnerId = ownerId });

            return Ok(ownerSchools);
        }
        
        [Route("school/{schoolId}")]
        [HttpGet]
        [SwaggerResponse(HttpStatusCode.OK)]
        public IHttpActionResult GetOwnersBySchool([FromUri] Guid schoolId)
        {
            var schoolOwners = _sqlDA.LoadData<SchoolOwner, dynamic>("dbo.spSchoolOwners_GetOwnersBySchool", new { SchoolId = schoolId });

            return Ok(schoolOwners);
        }

        [Route("all")]
        [HttpGet]
        [Authorize(Roles = "Administrator")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult GetAll()
        {
            try
            {
                var schoolOwners = _sqlDA.LoadData<SchoolOwner, dynamic>("dbo.spSchoolOwners_GetAll", new { });

                return Ok(schoolOwners);
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
        public IHttpActionResult Add(SchoolOwnerDto schoolOwner)
        {
            try
            {
                _sqlDA.SaveData<SchoolOwnerDto>("dbo.spSchoolOwners_Add", schoolOwner);

                return StatusCode(HttpStatusCode.Created);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("remove/{schoolId}")]
        [Route("remove/{schoolId}/{ownerId}")]
        [HttpDelete]
        [Authorize(Roles = "Administrator,DanceSchool")]
        public IHttpActionResult Remove([FromUri] Guid schoolId, Guid? ownerId = null)
        {
            try
            {
                var claimsIdentity = (ClaimsIdentity)HttpContext.Current.User.Identity;
                var userRole = claimsIdentity.Claims.FirstOrDefault(c => c.Type.Contains(@"identity/claims/role"))?.Value;
                if(userRole != null)
                {
                    if(userRole == "Administrator")
                    {
                        if(ownerId == null)
                            _sqlDA.SaveData<dynamic>("dbo.spSchoolOwners_RemoveBySchool", new { SchoolId = schoolId });
                        else
                            _sqlDA.SaveData<dynamic>("dbo.spSchoolOwners_Remove", new { SchoolId = schoolId, OwnerId = ownerId });
                    }
                    else if(userRole == "DanceSchool")
                    {
                        if (ownerId != null)
                            _sqlDA.SaveData<dynamic>("dbo.spSchoolOwners_Remove", new { SchoolId = schoolId, OwnerId = ownerId });
                        else
                            return BadRequest("School owner must provide ownerId to remove own school");
                    }
                }
                else
                {
                    return BadRequest("User's role hasn't been recognised");
                }


                return Ok();
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
