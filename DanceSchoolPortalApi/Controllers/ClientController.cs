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
    [RoutePrefix("client")]
    public class ClientController : ApiController
    {
        private string _connString;
        private SqlDataAccess _sqlDA;

        public ClientController()
        {
            _sqlDA = new SqlDataAccess();
            _connString = _sqlDA.GetConnectionString("MyConnection");
        }

        [HttpGet]
        [Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult Get(Guid id)
        {
            try
            {
                var client = _sqlDA.LoadData<Client, dynamic>("dbo.spClients_GetById", new { PersonId = id})
                    .FirstOrDefault();

                if (client == null)
                {
                    return NotFound();
                }

                return Ok(client);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("all")]
        [Authorize(Roles ="Administrator")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult GetAll()
        {
            try
            {
                var clients = _sqlDA.LoadData<Client, dynamic>("dbo.spClients_GetAll", new { });

                return Ok(clients);
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("add")]
        [AllowAnonymous]
        [SwaggerResponse(HttpStatusCode.Created)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult Add([FromBody]ClientDto client)
        {
            try
            {
                if (client == null)
                {
                    return BadRequest("Passed client is null!!");
                }

                if (client.PersonId == null)
                {
                    return BadRequest("You haven't passed Person to the object!!");
                }

                _sqlDA.SaveData<ClientDto>("dbo.spClients_Add", client);

                return StatusCode(HttpStatusCode.Created);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
