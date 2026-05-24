using System;
using WhisperLink.Domain.Enums;
using WhisperLink.Domain.Models.Users;

namespace WhisperLink.Domain.Models.Messages
{
    // DTO pentru returnare mesaj
    public class MessageDto
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        public string Content { get; set; } = string.Empty;
        public MessageStatus Status { get; set; }
        public DateTime? ReadAt { get; set; }
        public DateTime CreatedAt { get; set; }

        // Datele sender-ului și receiver-ului
        public UserDto Sender { get; set; } = null!;
        public UserDto Receiver { get; set; } = null!;
    }
}