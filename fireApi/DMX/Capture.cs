using fireApi.DMX;
using Haukcode.ArtNet.Packets;
using Haukcode.Sockets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace fireApi.DMX
{
    public class Capture : Base
    {
        public Capture(IPAddress localIp, IPAddress localSubnetMask)
            : base(localIp, localSubnetMask)
        {
        }

        protected override void Socket_NewPacket(object sender, NewPacketEventArgs<ArtNetPacket> e)
        {
           
        }
    }
}