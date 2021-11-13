using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using YoutubeDl.Lib;

namespace VideoDownload.Web.Hubs
{
    public class DownloadProgressHub : Hub
    {
        private readonly DownloadItemsContainer _downloadItemsContainer;

        public DownloadProgressHub(DownloadItemsContainer downloadItemsContainer)
        {
            _downloadItemsContainer = downloadItemsContainer;
        }

        public void Download(string url)
        {
            _downloadItemsContainer.AddItem(url);
        }
        
    }
    
    
}