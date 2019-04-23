using System.Threading.Tasks;

namespace NotifySignalR
{
    public interface ITypedHubClient
    {
        Task BroadcastMessage(string type, object payload);
    }
}
