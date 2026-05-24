using System;

namespace WhisperLink.Domain.Entities
{
    // Entitatea RefreshToken - pentru JWT authentication
    public class RefreshToken : BaseEntity
    {
        // User-ul căruia îi aparține
        public int UserId { get; set; }

        // Token-ul propriu-zis (string random base64)
        public string Token { get; set; } = string.Empty;

        // Data expirării (7 zile)
        public DateTime ExpiresAt { get; set; }

        // Dacă e revocat (logout)
        public bool IsRevoked { get; set; } = false;
        public DateTime? RevokedAt { get; set; }
        public string? ReplacedByToken { get; set; }

        // Navigation property
        public User User { get; set; } = null!;
    }
}