using DanceSchoolPortalApi.DataAccess;
using DanceSchoolPortalApi.Models;
using DanceSchoolPortalApi.ModelsDto;
using Swashbuckle.Swagger.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;

namespace DanceSchoolPortalApi.Controllers
{
    [Authorize]
    [RoutePrefix("person")]
    public class PersonController : ApiController
    {
        private string _connString;
        private SqlDataAccess _sqlDA;

        public PersonController()
        {
            _sqlDA = new SqlDataAccess();
            _connString = _sqlDA.GetConnectionString("MyConnection");
        }

        [Route("{id}")]
        [HttpGet]
        [AllowAnonymous]
        public IHttpActionResult Get(Guid id)
        {
            try
            {
                var person = _sqlDA.LoadData<Person, dynamic>("dbo.spPersons_GetById", new { Id = id })
                    .FirstOrDefault();

                if (person == null)
                {
                    return NotFound();
                }

                return Ok(person);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("byAspNetUserId/{aspNetUserId}")]
        [HttpGet]
        public IHttpActionResult GetByAspNetUserId(Guid aspNetUserId)
        {
            try
            {
                var person = _sqlDA.LoadData<Person, dynamic>("dbo.spPersons_GetByAspNetUser", new { AspNetUserId = aspNetUserId })
                    .FirstOrDefault();

                if (person == null)
                {
                    return NotFound();
                }

                return Ok(person);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("getByEmail")]
        [HttpPost]
        public IHttpActionResult Get([FromBody]PersonDto personObject)
        {
            try
            {
                if (personObject == null || string.IsNullOrEmpty(personObject.Email))
                    return BadRequest();

                var person = _sqlDA.LoadData<Person, dynamic>("dbo.spPersons_GetByEmail", new { Email = personObject.Email }).FirstOrDefault();
                if (person == null)
                    return NotFound();

                return Ok(person);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("all")]
        [HttpGet]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult GetAll()
        {
            try
            {
                var persons = _sqlDA.LoadData<Person, dynamic>("dbo.spPersons_GetAll", new { });

                return Ok(persons);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("add")]
        [HttpPost]
        [AllowAnonymous]
        public IHttpActionResult Add([FromBody]PersonDto person)
        {
            try
            {
                var aspNetUserId = _sqlDA.LoadData<string, dynamic>("dbo.spPerson_GetAspNetUserByEmail", new { Email = person.Email }).FirstOrDefault();
                if (string.IsNullOrEmpty(aspNetUserId))
                    return NotFound();

                var insertedRow = (IDictionary<string, object>)_sqlDA.SaveData<dynamic>("dbo.spPersons_Add",
                    new { person.AspNetUserId, person.Email, person.FirstName, person.LastName, person.Sex, person.TelephoneNumber });
                insertedRow.TryGetValue("Id", out object insertedId);

                return Created<string>("", insertedId?.ToString());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("update")]
        [HttpPut]
        [SwaggerResponse(HttpStatusCode.OK)]
        [SwaggerResponse(HttpStatusCode.BadRequest)]
        [SwaggerResponse(HttpStatusCode.NotFound)]
        [SwaggerResponse(HttpStatusCode.InternalServerError)]
        public IHttpActionResult Update([FromBody]Person person)
        {
            try
            {
                if (person.Id == null)
                    return BadRequest();


                if (!_sqlDA.LoadData<Person, dynamic>("dbo.spPersons_GetById", new { Id = person.Id }).Any())
                    return NotFound();

                _sqlDA.SaveData<Person>("dbo.spPersons_Update", person);

                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("remove/{id}")]
        [HttpDelete]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult Remove([FromUri]Guid id)
        {
            try
            {
                _sqlDA.SaveData<dynamic>("dbo.spPersons_Remove", new { Id = id });

                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
