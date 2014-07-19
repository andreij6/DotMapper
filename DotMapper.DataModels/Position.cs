using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace DotMapper.DataModels
{
    public class Position
    {
        public int Id { get; set; }

        
        public int Map_Id { get; set; }

        [ForeignKey("Map_Id")]
        public virtual Map Map { get; set; }

        public string Type { get; set; }

        public string Xcoor { get; set; }
        public string Ycoor { get; set; }

        public string Lat { get; set; }
        public string Long { get; set; }

        public string Attributes { get; set; }

        public SpatialReference spatialReference { get; set; }
    }

    public class SpatialReference
    {
        public int wkid { get; set; }
    }
}
