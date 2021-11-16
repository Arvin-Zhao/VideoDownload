using Microsoft.AspNetCore.Mvc;

namespace VideoDownload.Web.Controllers
{
    [ApiController]
    public class DownloadManagerController : Controller
    {
        // GET
        public IActionResult GetUrlInfo(string url)
        {
            //thumb
            //name
            //is play list?
            //format
            //
            return Ok();
        }

        public IActionResult Download(string url, params string[] arguments)
        {
            return Ok();
        }

        public IActionResult StopDownload(int id)
        {
            return Ok();
        }

        public IActionResult ResumeDownload(int id)
        {
            return Ok();
        }

        public IActionResult ClearCompleted()
        {
            return Ok();
        }

    }
}