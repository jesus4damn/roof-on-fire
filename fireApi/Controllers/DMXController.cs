using Microsoft.AspNetCore.Mvc;
using fireApi.Interfaces;
using System.Threading.Tasks;
using fireApi.Model;
using System.Collections.Generic;

namespace fireApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DMXController
    {

        private readonly IComPortSender _comPortSender;

        public DMXController(IComPortSender comPortSender)
        {
            _comPortSender = comPortSender;
        }

        [HttpPost]
        [Route("set")]
        public void Set(ChannelModel channelModel)
        {
            _comPortSender.SetChannelValue( channelModel);
        }

        [HttpPost]
        [Route("action")]
        public void Action(DevicesModel model)
        {
            _comPortSender.Action(model);
        }

        [HttpPost]
        [Route("initDevices")]
        public void Start(List<DevicesModel> models)
        {
            Task.Run(() => _comPortSender.InitDevices(models));
        }
    }
}

