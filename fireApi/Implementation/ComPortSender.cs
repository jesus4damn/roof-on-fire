using fireApi.Interfaces;
using fireApi.Model;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.IO.Ports;
using System.Linq;
using System.Management;
using System.Text.RegularExpressions;
using System.Threading;

namespace fireApi.Implementation
{
    public class ComPortSender : IComPortSender
    {
        private string VID = "0403";
        private string PID = "6001";
        private byte[] buffer = new byte[513];
        private bool isWork = false;
        private SerialPort serialPort { get; set; }
        public void SetServicePort()
        {
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

            public void Start()
        {
            string PortName = ComPortNames(VID,PID).FirstOrDefault();
            isWork = true;
            serialPort = new SerialPort(PortName);
            serialPort.DataBits = 8;
            serialPort.Handshake = Handshake.None;
            serialPort.Parity = Parity.None;
            serialPort.StopBits = StopBits.Two;
            if (!serialPort.IsOpen)
            {
                serialPort.Open();
            }
            while (isWork)
            {
                byte[] zero = new byte[] { 0x00 };
                serialPort.BaudRate = 96000;
                serialPort.Write(zero, 0, zero.Length);
                serialPort.BaudRate = 250000;
                serialPort.Write(buffer, 0, buffer.Length);
                Thread.Sleep(10);
            }
        }

        public void Stop ()
        {
            try
            {
                if (isWork)
                {
                    isWork = false;
                    serialPort.Close();
                }
            }
            catch (Exception )
            {

            }
        }

        public void SetChannelValue(ChannelModel model)
        {
            buffer[model.Channel] = Convert.ToByte(model.Value);
        }

        public string GetSettings()
        {
            return ComPortNames(VID, PID).FirstOrDefault(); ;
        }
    }
}
