namespace WhisperLink.BusinessLayer.Core.Helpers
{
    // Helper pentru hash-uire și verificare parole cu BCrypt
    public static class PasswordHasher
    {
        // Hash-uiește parola (cost factor 12)
        public static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password, 12);
        }

        // Verifică dacă parola dată corespunde cu hash-ul
        public static bool VerifyPassword(string password, string hash)
        {
            return BCrypt.Net.BCrypt.Verify(password, hash);
        }
    }
}