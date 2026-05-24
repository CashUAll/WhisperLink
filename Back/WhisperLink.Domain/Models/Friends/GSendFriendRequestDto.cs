using System.ComponentModel.DataAnnotations;

namespace WhisperLink.Domain.Models.Friends
{
    // DTO pentru trimitere cerere de prietenie
    public class SendFriendRequestDto
    {
        // ID-ul utilizatorului căruia îi trimiți cererea
        [Required]
        public int AddresseeId { get; set; }
    }
}