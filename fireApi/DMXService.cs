using fireApi.Interfaces;
using Microsoft.Extensions.Hosting;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.IO.Ports;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

namespace fireApi
{
    public class DMXService : BackgroundService
    {
        private string VID = "0403";
        private string PID = "6001";
        private SerialPort serialPort { get; set; }

        private readonly IComPortSender _comPortSender;

        public DMXService(IComPortSender comPortSender)
        {
            _comPortSender = comPortSender;
        }

        private List<string> ComPortNames(String VID, String PID)
        {
            String pattern = String.Format("^VID_{0}.PID_{1}", VID, PID);
            Regex _rx = new Regex(pattern, RegexOptions.IgnoreCase);
            List<string> comports = new List<string>();

            RegistryKey rk1 = Registry.LocalMachine;
            RegistryKey rk2 = rk1.OpenSubKey("SYSTEM\\CurrentControlSet\\Enum");

            foreach (String s3 in rk2.GetSubKeyNames())
            {
                RegistryKey rk3 = rk2.OpenSubKey(s3);
                foreach (String s in rk3.GetSubKeyNames())
                {
                    if (_rx.Match(s).Success)
                    {
                        RegistryKey rk4 = rk3.OpenSubKey(s);
                        foreach (String s2 in rk4.GetSubKeyNames())
                        {
                            RegistryKey rk5 = rk4.OpenSubKey(s2);
                            string location = (string)rk5.GetValue("LocationInformation");
                            RegistryKey rk6 = rk5.OpenSubKey("Device Parameters");
                            string portName = (string)rk6.GetValue("PortName");
                            if (!String.IsNullOrEmpty(portName) && SerialPort.GetPortNames().Contains(portName))
                                comports.Add((string)rk6.GetValue("PortName"));
                        }
                    }
                }
            }
            return comports;
        }


        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            try
            {
                List<string> PortName = ComPortNames(VID, PID);
                if(PortName.Count()==0)
                {
                    throw new Exception("Sorry port not found");
                }
                serialPort = new SerialPort(PortName.FirstOrDefault());
                serialPort.DataBits = 8;
                serialPort.Handshake = Handshake.None;
                serialPort.Parity = Parity.None;
                serialPort.StopBits = StopBits.Two;
                if (!serialPort.IsOpen)
                {
                    serialPort.Open();
                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }
                while (!stoppingToken.IsCancellationRequested)
                {
                    var buffer = _comPortSender.GetBuffer();
                    byte[] zero = new byte[] { 0x00 };
                    serialPort.BaudRate = 96000;
                    serialPort.Write(zero, 0, zero.Length);
                    serialPort.BaudRate = 250000;
                    serialPort.Write(buffer, 0, buffer.Length);
                    await Task.Delay(10, stoppingToken);
                }
            }
            catch (Exception e)
            {

            }
        }
    }
}
