using System;
using WhisperLink.Domain.Enums;
using WhisperLink.Domain.Models.Users;

namespace WhisperLink.Domain.Models.Friends
{
    // DTO pentru returnare prietenie
    public class FriendshipDto
    {
        public int Id { get; set; }
        public int RequesterId { get; set; }
        public int AddresseeId { get; set; }
        public FriendshipStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // Datele celor doi utilizatori
        public UserDto Requester { get; set; } = null!;
        public UserDto Addressee { get; set; } = null!;
    }
}