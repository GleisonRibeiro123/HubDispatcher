using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using NotifySignalR.Hubs;
using System;

namespace NotifySignalR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableController
    {
        private IHubContext<TableHub, ITypedHubClient> _hubContext;

        public TableController(IHubContext<TableHub, ITypedHubClient> hubContext)
        {
            _hubContext = hubContext;
        }

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