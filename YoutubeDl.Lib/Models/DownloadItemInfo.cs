using System;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Text.RegularExpressions;
using System.Threading;

namespace YoutubeDl.Lib.Models
{
    public class DownloadItemInfo
    {
        public int Id { get; set; }
        public decimal Percent { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }

        public string TotalSize { get; set; }
        
        public string ETA { get; set; }
        
        public string Speed { get; set; }

        public string Spend => _stopwatch.Elapsed.ToString(@"dd\ hh\:mm\:ss");

        private Stopwatch _stopwatch = new();
        
        public DownloadStatus Status { get; set; } = DownloadStatus.Pending;
        
        
        
        private Process _process;

        public Action<string> LogProgress;
        public void StopDown()
        {
            _stopwatch.Stop();
            if (_process != null && !_process.HasExited)
            {
                _process.Kill(entireProcessTree: true);
                _process = null;
            }
        }

        public void StartDown()
        {
            Status = DownloadStatus.InProgressing;
            _stopwatch.Start();
            CreateProcess();

            AttachStandardOutput();

            AttachErrorOutput();

            void CreateProcess()
            {
                string pkgManagerCommand = "youtube-dl";
                string exeToRun = pkgManagerCommand;
                string completeArguments = $" --newline {this.Url}";
                if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
                {
                    exeToRun = "cmd";
                    completeArguments = $"/c {pkgManagerCommand} {completeArguments}";
                }

                var processStartInfo = new ProcessStartInfo(exeToRun)
                {
                    Arguments = completeArguments,
                    UseShellExecute = false,
                    RedirectStandardInput = true,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    WorkingDirectory = "/data/download/",
                };
                _process = Process.Start(processStartInfo);
                if(_process != null) _process.EnableRaisingEvents = true;
            }

            void AttachStandardOutput()
            {
                var stdOut = new EvenStreamReader(_process.StandardOutput);
                stdOut.OnReceivedLine += line =>
                {
                    var regexName = new Regex(@"^\[download\]\s+Destination:\s+(.*)", RegexOptions.Compiled);
                    var matchResult = regexName.Match(line);
                    if (matchResult.Success)
                    {
                        Name = matchResult.Groups[1].Value;
                    }
                    else
                    {
                        var regexPercent = new Regex(@"\[download\]\s+(\d+[\.\d+]+)%\s+of\s+(.*)\s+at\s+(.*)\s+ETA\s+(.*)", RegexOptions.Compiled);
                        var matchPercentResult = regexPercent.Match(line);
                        if (matchPercentResult.Success)
                        {
                            Percent = decimal.Parse(matchPercentResult.Groups[1].Value);
                            TotalSize = matchPercentResult.Groups[2].Value;
                            Speed = matchPercentResult.Groups[3].Value;
                            ETA = matchPercentResult.Groups[4].Value;
                        }
                    }

                    LogProgress?.Invoke($"{Id} {line}");
                    Console.WriteLine(line);
                };

                stdOut.OnStreamClosed += () =>
                {
                    Percent = 100;
                    ETA = "0";
                    Console.WriteLine("normal done");
                    this.StopDown();
                    Status = DownloadStatus.Completed;
                };
            }

            void AttachErrorOutput()
            {
                var stdError = new EvenStreamReader(_process.StandardError);
                stdError.OnReceivedLine += line =>
                {
                    LogProgress?.Invoke($"{Id} {line}");
                    Console.WriteLine(line);
                };
                stdError.OnStreamClosed += () =>
                {
                    Status = DownloadStatus.Error;
                    this.StopDown();
                    Console.WriteLine("abnormal done");
                };
            }
        }
    }

    public enum DownloadStatus
    {
        Pending,
        InProgressing,
        Error,
        Completed
    }
}