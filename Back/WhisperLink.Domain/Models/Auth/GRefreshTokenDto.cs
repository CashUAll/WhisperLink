using System.ComponentModel.DataAnnotations;

namespace WhisperLink.Domain.Models.Users
{
    // DTO pentru refresh token request
    public class RefreshTokenDto
    {
        // Token-ul vechi care expiră
        [Required]
        public string RefreshToken { get; set; } = string.Empty;
    }
}