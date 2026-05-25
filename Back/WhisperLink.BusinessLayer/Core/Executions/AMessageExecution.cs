using System.Collections.Generic;
using System.Threading.Tasks;
using WhisperLink.BusinessLayer.Core.Interfaces;
using WhisperLink.Domain.Models.Messages;

namespace WhisperLink.BusinessLayer.Core.Executions
{
    // Orchestrare pentru MessageActions
    public class MessageExecution
    {
        private readonly IMessageAction _messageAction;

        public MessageExecution(IMessageAction messageAction)
        {
            _messageAction = messageAction;
        }

        // Send message - wrapper simplu
        public async Task<MessageDto?> SendMessageAsync(int senderId, SendMessageDto sendMessageDto)
        {
            return await _messageAction.SendMessageAsync(senderId, sendMessageDto);
        }

        // Get conversations - wrapper simplu
        public async Task<IEnumerable<ConversationDto>> GetConversationsAsync(int userId)
        {
            return await _messageAction.GetConversationsAsync(userId);
        }

        // Get conversation with user - wrapper simplu
        public async Task<IEnumerable<MessageDto>> GetConversationWithUserAsync(int userId, int otherUserId)
        {
            return await _messageAction.GetConversationWithUserAsync(userId, otherUserId);
        }

        // Mark message as read - wrapper simplu
        public async Task<bool> MarkMessageAsReadAsync(int messageId, int userId)
        {
            return await _messageAction.MarkMessageAsReadAsync(messageId, userId);
        }

        // Delete message - wrapper simplu
        public async Task<bool> DeleteMessageAsync(int messageId, int userId)
        {
            return await _messageAction.DeleteMessageAsync(messageId, userId);
        }
    }
}