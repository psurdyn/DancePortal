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
    [RoutePrefix("order")]
    public class OrderController : ApiController
    {
        private string _connString;
        private SqlDataAccess _sqlDA;

        public OrderController()
        {
            _sqlDA = new SqlDataAccess();
            _connString = _sqlDA.GetConnectionString("MyConnection");
        }

        [Route("{id}")]
        [HttpGet]
        [Authorize(Roles = "Administrator,DanceSchool,Client")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult Get(Guid id)
        {
            try
            {
                var order = _sqlDA.LoadData<Order, dynamic>("dbo.spOrders_GetById", new { Id = id})
                    .FirstOrDefault();

                if(order == null)
                {
                    return NotFound();
                }

                return Ok(order);
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("byClient/{clientId}")]
        [HttpGet]
        [Authorize(Roles = "Administrator,DanceSchool")]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult GetByClient(Guid clientId)
        {
            try
            {
                var orders = _sqlDA.LoadData<Order, dynamic>("dbo.spOrders_GetByClient", new { ClientId = clientId});

                return Ok(orders);
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
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
                var orders = _sqlDA.LoadData<Order, dynamic>("dbo.spOrders_GetAll", new { });

                return Ok(orders);
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("add")]
        [HttpPost]
        [AllowAnonymous]
        [SwaggerResponse(HttpStatusCode.Created)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult Add([FromBody]OrderDto order)
        {
            try
            {
                _sqlDA.SaveData<OrderDto>("dbo.spOrders_Add", order);

                return StatusCode(HttpStatusCode.Created);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("remove/{id}")]
        [HttpDelete]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult Remove([FromUri]Guid id)
        {
            try
            {
                _sqlDA.SaveData<dynamic>("dbo.spOrders_Remove", new { Id = id });

                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
