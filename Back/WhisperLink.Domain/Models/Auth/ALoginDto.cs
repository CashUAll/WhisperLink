using System.ComponentModel.DataAnnotations;

namespace WhisperLink.Domain.Models.Users
{
    // DTO pentru autentificare
    public class LoginDto
    {
        // Username SAU email
        [Required]
        public string UsernameOrEmail { get; set; } = string.Empty;

        // Parola
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}