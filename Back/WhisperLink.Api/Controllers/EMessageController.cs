using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using WhisperLink.BusinessLayer.Core.Executions;
using WhisperLink.Domain.Models.Messages;

namespace WhisperLink.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class MessageController : ControllerBase
    {
        private readonly MessageExecution _messageExecution;

        public MessageController(MessageExecution messageExecution)
        {
            _messageExecution = messageExecution;
        }

        // POST /api/Message - trimite mesaj nou
        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody] SendMessageDto sendMessageDto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int senderId))
                return Unauthorized(new { message = "Invalid token" });

            var message = await _messageExecution.SendMessageAsync(senderId, sendMessageDto);
            if (message == null) return BadRequest(new { message = "Failed to send message" });

            return CreatedAtAction(nameof(SendMessage), new { id = message.Id }, message);
        }

        // GET /api/Message/conversations - lista de chat-uri
        [HttpGet("conversations")]
        public async Task<IActionResult> GetConversations()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                return Unauthorized(new { message = "Invalid token" });

            var conversations = await _messageExecution.GetConversationsAsync(userId);
            return Ok(conversations);
        }

        // GET /api/Message/conversation/5 - mesajele cu un utilizator
        [HttpGet("conversation/{otherUserId}")]
        public async Task<IActionResult> GetConversationWithUser(int otherUserId)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                return Unauthorized(new { message = "Invalid token" });

            var messages = await _messageExecution.GetConversationWithUserAsync(userId, otherUserId);
            return Ok(messages);
        }

        // PUT /api/Message/123/read - marchează mesaj ca citit
        [HttpPut("{id}/read")]
        public async Task<IActionResult> MarkMessageAsRead(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                return Unauthorized(new { message = "Invalid token" });

            var result = await _messageExecution.MarkMessageAsReadAsync(id, userId);
            if (!result) return BadRequest(new { message = "Failed to mark message as read" });

            return Ok(new { message = "Message marked as read" });
        }

        // DELETE /api/Message/123 - șterge mesaj
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMessage(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                return Unauthorized(new { message = "Invalid token" });

            var result = await _messageExecution.DeleteMessageAsync(id, userId);
            if (!result) return BadRequest(new { message = "Failed to delete message" });

            return Ok(new { message = "Message deleted successfully" });
        }
    }
}