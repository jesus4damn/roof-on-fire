using Haukcode.ArtNet.Packets;
using Haukcode.ArtNet.Sockets;
using Haukcode.Sockets;
using System;
using System.Net;

namespace fireApi.DMX
{
    public abstract class Base : IDisposable
    {
        protected readonly ArtNetSocket socket;

        public Base(IPAddress localIp, IPAddress localSubnetMask)
        {
            this.socket = new ArtNetSocket
            {
                EnableBroadcast = true
            };

            this.socket.NewPacket += Socket_NewPacket;

            this.socket.Open(localIp, localSubnetMask);
        }

        protected abstract void Socket_NewPacket(object sender, NewPacketEventArgs<ArtNetPacket> e);

        public void Dispose()
        {
            this.socket.Close();
            this.socket.Dispose();
        }
    }
}