using System;
using WhisperLink.Domain.Enums;

namespace WhisperLink.Domain.Entities
{
    // Entitatea Friendship - relațiile de prietenie
    public class Friendship : BaseEntity
    {
        // Cine trimite cererea
        public int RequesterId { get; set; }

        // Cine primește cererea
        public int AddresseeId { get; set; }

        // Statusul cererii - Pending, Accepted, Rejected, Blocked
        public FriendshipStatus Status { get; set; } = FriendshipStatus.Pending;

        // Navigation properties
        public User Requester { get; set; } = null!;
        public User Addressee { get; set; } = null!;
    }
}