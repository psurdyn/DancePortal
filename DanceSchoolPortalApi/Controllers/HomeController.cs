using System.Web.Http;

namespace DanceSchoolPortalApi.Controllers
{
    public class HomeController : ApiController
    {
        // GET: Home        
        [Route("")]
        [HttpGet]
        public string Index()
        {
            return "success!";
        }
    }
}