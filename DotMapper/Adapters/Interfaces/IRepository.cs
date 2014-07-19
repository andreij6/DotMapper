using DotMapper.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotMapper.Adapters.Interfaces
{
    public interface IRepository
    {
        void SavePosition(Position value);

        int SaveMap(Map value);

        IEnumerable<Map> GetMaps();
    }
}
