using DotMapper.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DotMapper.Controllers
{
    public class MapsController : ApiController
    {
        // GET: api/Maps
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Maps/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Maps
        public IHttpActionResult Post([FromBody]Map value)
        {
            return Ok(1);
        }

        // PUT: api/Maps/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Maps/5
        public void Delete(int id)
        {
        }
    }
}
