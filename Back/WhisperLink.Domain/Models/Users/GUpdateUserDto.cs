namespace WhisperLink.Domain.Models.Users
{
    // DTO pentru actualizare profil utilizator
    public class UpdateUserDto
    {
        // Câmpuri opționale - doar ce vrea user-ul să modifice
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? ProfilePictureUrl { get; set; }
    }
}