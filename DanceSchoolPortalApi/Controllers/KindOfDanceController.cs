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
    [Authorize(Roles = "Administrator")]
    [RoutePrefix("kindOfDance")]
    public class KindOfDanceController : ApiController
    {
        private string _connString;
        private SqlDataAccess _sqlDA;

        public KindOfDanceController()
        {
            _sqlDA = new SqlDataAccess();
            _connString = _sqlDA.GetConnectionString("MyConnection");
        }

        [Route("{id}")]
        [HttpGet]
        [AllowAnonymous]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult Get(Guid id)
        {
            try
            {
                var kindOfDance = _sqlDA.LoadData<KindOfDance, dynamic>("dbo.spKindsOfDances_GetById", new { Id = id})
                    .FirstOrDefault();

                if(kindOfDance == null)
                {
                    return NotFound();
                }

                return Ok(kindOfDance);
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        //[Route("byName/{name}")]
        //[HttpGet]
        //[AllowAnonymous]
        //[SwaggerResponse(HttpStatusCode.OK)]
        //[SwaggerResponse(HttpStatusCode.NotFound)]
        //[SwaggerResponse(HttpStatusCode.InternalServerError)]
        //public IHttpActionResult GetByName(string name)
        //{
        //    try
        //    {
        //        var kindOfDance = _sqlDA.LoadData<KindOfDance, dynamic>("dbo.spKindsOfDances_GetByName", new { Name = name})
        //            .FirstOrDefault();

        //        if(kindOfDance == null)
        //        {
        //            return NotFound();
        //        }

        //        return Ok(kindOfDance);
        //    }
        //    catch(Exception ex)
        //    {
        //        return InternalServerError(ex);
        //    }
        //}

        [Route("all")]
        [HttpGet]
        [AllowAnonymous]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult GetAll()
        {
            try
            {
                var kindsOfDances = _sqlDA.LoadData<KindOfDance, dynamic>("dbo.spKindsOfDances_GetAll", new { });

                return Ok(kindsOfDances);
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
        public IHttpActionResult Add([FromBody]KindOfDanceDto kindOfDance)
        {
            try
            {
                _sqlDA.SaveData<KindOfDanceDto>("dbo.spKindsOfDances_Add", kindOfDance);

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
                _sqlDA.SaveData<dynamic>("dbo.spKindsOfDances_Remove", new { Id = id });

                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
