using DanceSchoolPortalApi.DataAccess;
using DanceSchoolPortalApi.Models;
using DanceSchoolPortalApi.ModelsDto;
using Dapper;
using Swashbuckle.Swagger.Annotations;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DanceSchoolPortalApi.Controllers
{
    [Authorize(Roles = "Administrator")]
    [RoutePrefix("payment")]
    public class PaymentController : ApiController
    {
        private SqlDataAccess _sqlDA;

        public PaymentController()
        {
            _sqlDA = new SqlDataAccess();
        }

        [Route("{Id}")]
        [HttpGet]
        [AllowAnonymous]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult Get([FromUri]Guid id)
        {
            try
            {
                var payment = _sqlDA.LoadData<Payment, dynamic>("dbo.spPayments_GetById", new { Id = id})
                    .FirstOrDefault();

                if (payment == null)
                {
                    return NotFound();
                }

                return Ok(payment);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("byKind/{kind}")]
        [HttpGet]
        [AllowAnonymous]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult GetByKind([FromUri]string kind)
        {
            try
            {
                var payment = _sqlDA.LoadData<Payment, dynamic>("dbo.spPayments_GetByKind", new { KindOfPayment = kind})
                    .FirstOrDefault();

                if (payment == null)
                {
                    return NotFound();
                }

                return Ok(payment);
            }
            catch (Exception ex)
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
                var payments = _sqlDA.LoadData<Payment, dynamic>("dbo.spPayments_GetAll", new { });

                return Ok(payments);
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
        public IHttpActionResult Add([FromBody]PaymentDto payment)
        {
            try
            {
                _sqlDA.SaveData<PaymentDto>("dbo.spPayments_Add", payment);

                return StatusCode(HttpStatusCode.Created);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
