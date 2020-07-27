using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.IO.Ports;
using System;
using System.Runtime.CompilerServices;
using fireApi.Interfaces;
using System.Threading.Tasks;
using fireApi.Model;

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


        [HttpGet]
        public string HealthCheck()
        {
            return "I'm alive" + _comPortSender.GetSettings();
           
        }

        [HttpPost]
        [Route("set")]
        public void Set(ChannelModel channelModel)
        {
            _comPortSender.SetChannelValue( channelModel);
        }

        [HttpPost]
        [Route("stop")]
        public void Stop()
        {
            _comPortSender.Stop();
        }

        [HttpPost]
        [Route("play")]
        public void Start()
        {
            Task.Run(() => _comPortSender.Start());


            /*  var addresses = Helper.GetAddressesFromInterfaceType();
              var addr = addresses.ToArray()[1];
              while (true)
              {
                  using (var tester = new TriggerSender(localIp: IPAddress.Parse("127.0.0.1"), localSubnetMask: IPAddress.Parse("255.255.255.0")))
                  {

                      tester.SendTrigger();
                      Thread.Sleep(1000);

                  }
              }*/


        }
    }
}

