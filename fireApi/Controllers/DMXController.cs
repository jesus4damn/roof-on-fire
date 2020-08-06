using Microsoft.AspNetCore.Mvc;
using fireApi.Interfaces;
using System.Threading.Tasks;
using fireApi.Model;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

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

        [HttpPost]
        [Route("save")]
        public void Save(object obj)
        {
            System.IO.File.WriteAllText(@"D:\path.txt", obj.ToString());
        }


        [HttpPost]
        [Route("load")]
        public JObject Load(string file)
        {
            string response = File.ReadAllText(@"D:\path.txt");
            return JObject.Parse(response);
        }

    }
}

