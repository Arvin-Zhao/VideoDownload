using System.Collections.Generic;
using System.Linq;
using System.Text;
using YoutubeDl.Lib.Models;

namespace YoutubeDl.Lib
{
    public class DownloadItemsContainer
    {
        private readonly List<DownloadItemInfo> _items = new();
        private readonly StringBuilder _loggerStringBuilder = new StringBuilder();
        private readonly object _locker = new object();
        public void AddItem(string url)
        {
            _items.Add(new DownloadItemInfo()
            {
                Id = _items.Any() ? _items.Max(p=>p.Id) + 1 : 1,
                Name = "哦 我叫啥?",
                Url = url
            });
        }

        public void RemoveCompleted()
        {
            _items.RemoveAll(p => p.Status is DownloadStatus.Completed or DownloadStatus.Error);
        }
        
        public List<DownloadItemInfo> GetAllItemStatus() => _items;

        public string FlushOutput()
        {
            lock (_locker)
            {
                var outputStr = _loggerStringBuilder.ToString();
                _loggerStringBuilder.Clear();
                return outputStr;
            }
        }

        public void StopAllProcess()
        {
            _items.ForEach(item =>
            {
                item.StopDown();
            });
        }

        public bool TryToTriggerNextDown()
        {
            if (_items.Any(p => p.Status == DownloadStatus.Pending)
                && _items.Count(p => p.Status == DownloadStatus.InProgressing) < 2)
            {
                var nextTobeTriggered = _items
                    .Where(p => p.Status == DownloadStatus.Pending)
                    .OrderBy(p => p.Id)
                    .First();
                nextTobeTriggered.LogProgress += line =>
                {
                    lock (_locker)
                    {
                        _loggerStringBuilder.AppendLine(line);
                    }
                };
                nextTobeTriggered.StartDown();
                return true;
            }

            return false;
        }
    }
}