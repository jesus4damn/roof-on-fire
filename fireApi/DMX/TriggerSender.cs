
using Haukcode.ArtNet.Packets;
using Haukcode.Sockets;
using System;
using System.Net;

namespace fireApi.DMX
{
    public class TriggerSender : Capture
    {
        public TriggerSender(IPAddress localIp, IPAddress localSubnetMask)
            : base(localIp, localSubnetMask)
        {
        }

        protected override void Socket_NewPacket(object sender, NewPacketEventArgs<ArtNetPacket> e)
        {
            base.Socket_NewPacket(sender, e);
        }

        public void SendTrigger()
        {
            var value = new byte[512];
            value[0] = Convert.ToByte(new Random().Next(100,200));
            value[1] = Convert.ToByte(new Random().Next(100, 200));

            this.socket.Send(new ArtNetDmxPacket
            {               
                Universe = 0,
                DmxData = value,
            });
        }
    }
}