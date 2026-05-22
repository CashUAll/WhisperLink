using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using WhisperLink.BusinessLayer.Core.Executions;
using WhisperLink.Domain.Models.Messages;

namespace WhisperLink.Api.Hubs
{
    // SignalR Hub pentru real-time messaging
    [Authorize]
    public class ChatHub : Hub
    {
        private readonly MessageExecution _messageExecution;

        public ChatHub(MessageExecution messageExecution)
        {
            _messageExecution = messageExecution;
        }

        // Când user se conectează la hub
        public override async Task OnConnectedAsync()
        {
            var userIdClaim = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!string.IsNullOrEmpty(userIdClaim) && int.TryParse(userIdClaim, out int userId))
            {
                // Notifică toți ceilalți că user-ul e online
                await Clients.Others.SendAsync("UserOnline", userId);
            }

            await base.OnConnectedAsync();
        }

        // Când user se deconectează
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var userIdClaim = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!string.IsNullOrEmpty(userIdClaim) && int.TryParse(userIdClaim, out int userId))
            {
                // Notifică toți ceilalți că user-ul e offline
                await Clients.Others.SendAsync("UserOffline", userId);
            }

            await base.OnDisconnectedAsync(exception);
        }

        // Trimite mesaj prin SignalR
        public async Task SendMessage(int receiverId, string content)
        {
            var userIdClaim = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int senderId))
                return;

            // Salvează mesajul în database
            var sendMessageDto = new SendMessageDto
            {
                ReceiverId = receiverId,
                Content = content
            };

            var message = await _messageExecution.SendMessageAsync(senderId, sendMessageDto);
            if (message == null) return;

            // Trimite mesajul LIVE către receiver
            await Clients.User(receiverId.ToString()).SendAsync("ReceiveMessage", message);

            // Confirmare către sender
            await Clients.Caller.SendAsync("MessageSent", message);
        }

        // Marchează mesaj ca citit
        public async Task MarkAsRead(int messageId)
        {
            var userIdClaim = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                return;

            var result = await _messageExecution.MarkMessageAsReadAsync(messageId, userId);

            if (result)
            {
                // Notifică toată lumea că mesajul a fost citit
                await Clients.All.SendAsync("MessageRead", messageId, userId);
            }
        }
    }
}