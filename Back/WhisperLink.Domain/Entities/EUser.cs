using System;
using System.Collections.Generic;
using WhisperLink.Domain.Enums;

namespace WhisperLink.Domain.Entities
{
    // Entitatea User - utilizatorii aplicației
    public class User : BaseEntity
    {
        // Username unic pentru login
        public string Username { get; set; } = string.Empty;

        // Email unic
        public string Email { get; set; } = string.Empty;

        // Parola hash-uită cu BCrypt - nu salvăm niciodată în clar
        public string PasswordHash { get; set; } = string.Empty;

        // Informații profil (opționale)
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? ProfilePictureUrl { get; set; }

        // Rolul utilizatorului - User sau Admin
        public UserRole Role { get; set; } = UserRole.User;

        // Status online/offline
        public bool IsOnline { get; set; } = false;

        // Ultima activitate
        public DateTime? LastSeenAt { get; set; }

        // Navigation properties - relații cu alte tabele (Entity Framework face JOIN-uri automate)
        public ICollection<Message> SentMessages { get; set; } = new List<Message>();
        public ICollection<Message> ReceivedMessages { get; set; } = new List<Message>();
        public ICollection<Friendship> RequestedFriendships { get; set; } = new List<Friendship>();
        public ICollection<Friendship> ReceivedFriendships { get; set; } = new List<Friendship>();
        public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    }
}