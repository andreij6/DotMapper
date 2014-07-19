using DotMapper.Adapters.Interfaces;
using DotMapper.Data;
using DotMapper.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DotMapper.Adapters.Adapters
{
    public class Repository : IRepository
    {

        public void SavePosition(Position value)
        {
            using(ApplicationDbContext db = new ApplicationDbContext())
            {
                
                db.Points.Add(value);

                db.SaveChanges();
                
            }
        }

        public int SaveMap(Map map)
        {
            int id;
            using(ApplicationDbContext db = new ApplicationDbContext())
            {
                

                db.Maps.Add(map);

                
                db.SaveChanges();

                id = db.Maps.Where(x => x.Title == map.Title).FirstOrDefault().Id;

                
            }

            return id;
        }


        public IEnumerable<Map> GetMaps()
        {
            var maps = new List<Map>();

            using(ApplicationDbContext db = new ApplicationDbContext())
            {
                maps = db.Maps.ToList();
            }

            return maps;
        }
    }
}