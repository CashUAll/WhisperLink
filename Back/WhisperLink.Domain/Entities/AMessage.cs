using System;
using WhisperLink.Domain.Enums;

namespace WhisperLink.Domain.Entities
{
    // Entitatea Message - mesajele între utilizatori
    public class Message : BaseEntity
    {
        // Foreign Keys
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }

        // Conținutul mesajului
        public string Content { get; set; } = string.Empty;

        // Status pentru read receipts
        public MessageStatus Status { get; set; } = MessageStatus.Sent;

        // Când a fost citit mesajul
        public DateTime? ReadAt { get; set; }

        // Navigation properties
        public User Sender { get; set; } = null!;
        public User Receiver { get; set; } = null!;
    }
}