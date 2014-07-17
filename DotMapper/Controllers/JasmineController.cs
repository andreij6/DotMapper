using System;
using System.Web.Mvc;

namespace DotMapper.Controllers
{
    public class JasmineController : Controller
    {
        public ViewResult Run()
        {
            return View("SpecRunner");
        }
    }
}
