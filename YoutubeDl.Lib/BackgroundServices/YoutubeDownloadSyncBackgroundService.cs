using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using VideoDownload.Web.Hubs;
using YoutubeDl.Lib.Models;

namespace YoutubeDl.Lib.BackgroundServices
{
    public class YoutubeDownloadSyncBackgroundService:BackgroundService
    {
        private readonly IServiceScopeFactory _serviceScopeFactory;
        private readonly DownloadItemsContainer _downloadItemsContainer;

        public YoutubeDownloadSyncBackgroundService(IServiceScopeFactory serviceScopeFactory, DownloadItemsContainer downloadItemsContainer)
        {
            _serviceScopeFactory = serviceScopeFactory;
            _downloadItemsContainer = downloadItemsContainer;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                CheckDownloadStatus();
                await SendMessageToClientAsync(stoppingToken);
            }

            _downloadItemsContainer.StopAllProcess();
        }

        private void CheckDownloadStatus()
        {
            _downloadItemsContainer.TryToTriggerNextDown();
        }

        private async Task SendMessageToClientAsync(CancellationToken stoppingToken)
        {
            using var scope = _serviceScopeFactory.CreateScope();
            var hub = scope.ServiceProvider.GetService<IHubContext<DownloadProgressHub>>();
            if (hub != null)
            {
                var data = _downloadItemsContainer.GetAllItemStatus();
                var log = _downloadItemsContainer.FlushOutput();
                await hub.Clients.All.SendAsync("getMessage", data,log, stoppingToken);
            }
            else 
                throw new ApplicationException("没有注册下载组件");
            await Task.Delay(3000, stoppingToken);
        }
    }
}