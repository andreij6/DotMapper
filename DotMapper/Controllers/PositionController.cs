using DotMapper.Adapters.Adapters;
using DotMapper.Adapters.Interfaces;
using DotMapper.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DotMapper.Controllers
{
    public class PositionController : ApiController
    {
        IRepository db;

        public PositionController()
        {
            db = new Repository();
        }

        public PositionController(IRepository _db)
        {
            db = _db;
        }

        // GET: api/Points
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Points/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Points
        public void Post([FromBody]Position value)
        {
            db.SavePosition(value);
        }

        // PUT: api/Points/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Points/5
        public void Delete(int id)
        {
        }
    }
}
