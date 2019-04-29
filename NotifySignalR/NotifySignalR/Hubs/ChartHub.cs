using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace NotifySignalR
{
    public class ChartHub : Hub<ITypedHubClient>//Implementar Hub<Interface>
    {
        // private readonly ITypedHubClient _itypedhubclient;
        // public ChartHub(ITypedHubClient itypedhubclient)
        // {
        //     this._itypedhubclient = itypedhubclient;

        //     this.OnDisconnectedAsync(new System.Exception{});
        // }
        // // public virtual Task OnDisconnected()
    }
}