using System.ComponentModel.DataAnnotations;

namespace WhisperLink.Domain.Models.Messages
{
    // DTO pentru trimitere mesaj nou
    public class SendMessageDto
    {
        // ID-ul destinatarului
        [Required]
        public int ReceiverId { get; set; }

        // Conținutul mesajului
        [Required]
        public string Content { get; set; } = string.Empty;
    }
}