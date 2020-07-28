using fireApi.Interfaces;
using fireApi.Model;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace fireApi.Implementation
{
    public class ComPortSender : IComPortSender
    {
        private byte[] buffer = new byte[513];
        public void SetServicePort()
        {
        }

        public byte[] GetBuffer()
        {
            return buffer;
        }

        public void SetChannelValue(ChannelModel model)
        {
            buffer[model.Channel] = Convert.ToByte(model.Value);
        }

        public void InitDevices(List<DevicesModel> models)
        {
            buffer = new byte[513];
            foreach (var model in models)
            {
                buffer[model.StartAddress] = 128;
            }
        }

        public void Action(DevicesModel model)
        {
            if (!model.Shot)
            {
                var sequncises = Regex.Match(model.ActivePattern.Name, @"\d+").Value;
                int pattern = int.Parse(sequncises);
                buffer[model.StartAddress + 4] = (byte)Math.Round((decimal)(2 + pattern*2.55),0);
                // shot 
                buffer[model.StartAddress + 2] = 255;
            }
            else
            {
                buffer[model.StartAddress + 2] = 0;
            }
        }

    }
}
