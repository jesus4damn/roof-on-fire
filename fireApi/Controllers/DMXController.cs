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
        public void Save(SaveModel model)
        {
         
            System.IO.File.WriteAllText(@""+model.Path+".txt", model.Data.ToString());
        }


        [HttpPost]
        [Route("load")]
        public JObject Load(LoadModel model)
        {
            string response = File.ReadAllText(@"" + model.Path);
            return JObject.Parse(response);
        }

    }
}

