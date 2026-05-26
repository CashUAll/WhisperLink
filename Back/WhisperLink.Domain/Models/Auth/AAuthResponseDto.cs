namespace WhisperLink.Domain.Models.Users
{
    // DTO pentru răspunsul de autentificare
    public class AuthResponseDto
    {
        // JWT access token (30 min)
        public string Token { get; set; } = string.Empty;

        // Refresh token (7 zile)
        public string RefreshToken { get; set; } = string.Empty;

        // Datele utilizatorului
        public UserDto User { get; set; } = null!;
    }
}