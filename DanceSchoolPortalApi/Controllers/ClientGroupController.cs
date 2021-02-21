using DanceSchoolPortalApi.DataAccess;
using DanceSchoolPortalApi.Models;
using DanceSchoolPortalApi.ModelsDto;
using DanceSchoolPortalApi.ViewModels;
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
    [RoutePrefix("clientGroup")]
    public class ClientGroupController : ApiController
    {
        private string _connString;
        private SqlDataAccess _sqlDA;

        public ClientGroupController()
        {
            _sqlDA = new SqlDataAccess();
            _connString = _sqlDA.GetConnectionString("MyConnection");
        }

        [HttpGet]
        [Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult GetByGroup(Guid groupId)
        {
            try
            {
                var clientGroup = _sqlDA.LoadData<ClientGroup, dynamic>("dbo.spClientGroups_GetById", new { GroupId = groupId });

                if (clientGroup == null || clientGroup.Count == 0)
                {
                    return NotFound();
                }

                return Ok(clientGroup);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("{clientId}")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult GetByClient(Guid clientId)
        {
            try
            {
                var clientGroup = _sqlDA.LoadData<ClientGroup, dynamic>("dbo.spClientGroups_GetByClient", new { ClientId = clientId });

                if(clientGroup == null ||clientGroup.Count == 0)
                {
                    return NotFound();
                }

                return Ok(clientGroup);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("{clientId}/{groupId}")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult GetByClientAndGroup(Guid clientId, Guid groupId)
        {
            try
            {
                var clientGroup = _sqlDA.LoadData<ClientGroup, dynamic>("dbo.spClientGroups_GetByClientAndGroup", new { ClientId = clientId, GroupId = groupId })
                    .FirstOrDefault();

                if (clientGroup == null)
                {
                    return NotFound();
                }

                return Ok(clientGroup);
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("all")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult GetAll()
        {
            try
            {
                var clientGroups = _sqlDA.LoadData<ClientGroup, dynamic>("dbo.spClientGroups_GetAll", new { });
                
                return Ok(clientGroups);
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
        public IHttpActionResult Add([FromBody]ClientGroupDto clientGroup)
        {
            try
            {
                if(clientGroup == null)
                {
                    return BadRequest("Passed clientGroup is null!!");
                }

                if(clientGroup.ClientId == null)
                {
                    return BadRequest("Passed clientGroup doesn't have client!!");
                }

                if(clientGroup.StudyGroupId == null)
                {
                    return BadRequest("Passed clientGroup doesn't have study group!!");
                }

                var exactClientGroup = _sqlDA.LoadData<ClientGroup, dynamic>("dbo.spClientGroups_GetByClientAndGroup", new { ClientId = clientGroup.ClientId, StudyGroupId = clientGroup.StudyGroupId})
                    .FirstOrDefault();

                if(exactClientGroup != null)
                {
                    return BadRequest("There is already the same active clientGroup!!");
                }

                _sqlDA.SaveData<ClientGroupDto>("dbo.spClientGroups_Add", clientGroup);
                return StatusCode(HttpStatusCode.Created);
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpDelete]
        [Route("remove/{groupId}")]
        [Route("remove/{groupId}/{clientId}")]
        public IHttpActionResult Remove(Guid groupId, Guid? clientId = null)
        {
            try
            {
                var claimsIdentity = (ClaimsIdentity)HttpContext.Current.User.Identity;
                var userRole = claimsIdentity.Claims.FirstOrDefault(c => c.Type.Contains(@"identity/claims/role"))?.Value;
                
                if (string.IsNullOrEmpty(userRole))
                    return BadRequest("You don't have a role!");

                if (userRole == "Client" && clientId == null)
                    return BadRequest("You have to pass client id!");

                _sqlDA.SaveData<dynamic>("dbo.spClientGroups_Remove", new { GroupId = groupId, ClientId = clientId });

                return Ok();
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
