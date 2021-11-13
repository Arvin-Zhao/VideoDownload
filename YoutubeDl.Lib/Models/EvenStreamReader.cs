using System;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace YoutubeDl.Lib.Models
{
    public class EvenStreamReader
    {
        
        public delegate void OnReceivedLineHandler(string line);
        public delegate void OnStreamClosedHandler();

        
        public event OnReceivedLineHandler OnReceivedLine;
        public event OnStreamClosedHandler OnStreamClosed;

        private readonly StreamReader _streamReader;
        private readonly StringBuilder _linesBuffer;

        public EvenStreamReader(StreamReader streamReader)
        {
            _streamReader = streamReader ?? throw new ArgumentNullException(nameof(streamReader));
            _linesBuffer = new StringBuilder();
            Task.Factory.StartNew(Run);
        }

        private async Task Run()
        {
            var buf = new char[8 * 1024];
            while (true)
            {
                var chunkLength = await _streamReader.ReadAsync(buf, 0, buf.Length);
                if (chunkLength == 0)
                {
                    if (_linesBuffer.Length > 0)
                    {
                        OnCompleteLine(_linesBuffer.ToString());
                        _linesBuffer.Clear();
                    }

                    OnClosed();
                    break;
                }
                Console.WriteLine(new StringBuilder().Append(buf).ToString());
                int lineBreakPos = -1;
                int startPos = 0;

                // get all the newlines
                while ((lineBreakPos = Array.IndexOf(buf, '\n', startPos, chunkLength - startPos)) >= 0 && startPos < chunkLength)
                {
                    var length = (lineBreakPos + 1) - startPos;
                    _linesBuffer.Append(buf, startPos, length);
                    OnCompleteLine(_linesBuffer.ToString());
                    _linesBuffer.Clear();
                    startPos = lineBreakPos + 1;
                }

                // get the rest
                if (lineBreakPos < 0 && startPos < chunkLength)
                {
                    _linesBuffer.Append(buf, startPos, chunkLength - startPos);
                }
            }
        }

        private void OnCompleteLine(string line)
        {
            var dlg = OnReceivedLine;
            dlg?.Invoke(line);
        }

        private void OnClosed()
        {
            var dlg = OnStreamClosed;
            dlg?.Invoke();
        }
    }
}