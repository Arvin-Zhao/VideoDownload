using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace VideoDownload.Web.Hubs
{
    public class DownloadProgressHub : Hub
    {
        private static int counter = 0;
        private static List<DownloadItemInfo> data = new List<DownloadItemInfo>();
        public async Task Download(string url)
        {
            data.Add(new DownloadItemInfo()
            {
                Id = counter ++,
                Percent = 10,
                Name = url
            });
            await Clients.All.SendAsync("getMessage", data);
        }

        private class DownloadItemInfo
        {
            public int Id { get; set; }
            public int Percent { get; set; }
            public string Name { get; set; }
        }
    }
    
    
}