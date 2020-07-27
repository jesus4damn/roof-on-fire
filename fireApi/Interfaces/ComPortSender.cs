using fireApi.Model;

namespace fireApi.Interfaces
{
    public interface IComPortSender
    {
        public void Start();

        void Stop();

        void SetChannelValue(ChannelModel model);

        string GetSettings();
    }
}
