namespace WhisperLink.Domain.Enums
{
    // Statusul mesajelor - pentru read receipts
    public enum MessageStatus
    {
        Sent = 0,       // Mesaj trimis
        Delivered = 1,  // Mesaj livrat
        Read = 2        // Mesaj citit
    }
}