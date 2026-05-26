using System.ComponentModel.DataAnnotations;

namespace WhisperLink.Domain.Models.Users
{
    // DTO pentru înregistrare utilizator nou
    public class RegisterDto
    {
        // Username obligatoriu
        [Required]
        public string Username { get; set; } = string.Empty;

        // Email obligatoriu și valid
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        // Parolă obligatorie, minim 6 caractere
        [Required]
        [MinLength(6)]
        public string Password { get; set; } = string.Empty;

        // Informații opționale
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }
}