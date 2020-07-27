using fireApi.Model;
using System.Collections.Generic;

namespace fireApi.Interfaces
{
    public interface IComPortSender
    {
       public void InitDevices(List<DevicesModel> models);

        void SetChannelValue(ChannelModel model);

        byte[] GetBuffer();

        void Action(DevicesModel model);

    }
}
