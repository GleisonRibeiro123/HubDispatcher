using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;

namespace NotifySignalR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChartController
    {
        private IHubContext<ChartHub, ITypedHubClient> _hubContext;

        public ChartController(IHubContext<ChartHub, ITypedHubClient> hubContext)
        {
            _hubContext = hubContext;
        }

        //Realiza o post no BE, fazendo assim a comunicação do BE -> FE.
        [HttpPost]
        public string Post([FromBody]Message msg)
        {
            string retMessage = string.Empty;
            try
            {
                _hubContext.Clients.All.BroadcastMessage(msg.Type, msg.Payload);
                retMessage = "Success";
            }
            catch (Exception e)
            {
                retMessage = e.ToString();
            }
            return retMessage;
        }
    }
}