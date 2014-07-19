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
    public class MapsController : ApiController
    {
        IRepository db;

        public MapsController()
        {
            db = new Repository();
        }

        public MapsController(IRepository _db)
        {
            db = _db;
        }

        // GET: api/Maps
        public IEnumerable<Map> Get()
        {
            return db.GetMaps();
        }

        // GET: api/Maps/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Maps
        public IHttpActionResult Post([FromBody]Map value)
        {
            var mapId = db.SaveMap(value);

            return Ok(mapId);
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
