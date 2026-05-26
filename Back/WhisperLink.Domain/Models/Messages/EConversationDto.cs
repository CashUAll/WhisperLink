using WhisperLink.Domain.Models.Users;

namespace WhisperLink.Domain.Models.Messages
{
    // DTO pentru lista de conversații (ca WhatsApp sidebar)
    public class ConversationDto
    {
        // Utilizatorul cu care ai conversația
        public UserDto User { get; set; } = null!;

        // Ultimul mesaj din conversație
        public MessageDto LastMessage { get; set; } = null!;

        // Numărul de mesaje necitite
        public int UnreadCount { get; set; }
    }
}