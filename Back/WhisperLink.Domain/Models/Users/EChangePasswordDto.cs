using System.ComponentModel.DataAnnotations;

namespace WhisperLink.Domain.Models.Users
{
    // DTO pentru schimbare parolă
    public class ChangePasswordDto
    {
        // Parola actuală pentru confirmare
        [Required]
        public string CurrentPassword { get; set; } = string.Empty;

        // Noua parolă, minim 6 caractere
        [Required]
        [MinLength(6)]
        public string NewPassword { get; set; } = string.Empty;
    }
}