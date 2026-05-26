using System.Threading.Tasks;

namespace WhisperLink.BusinessLayer.Core.Interfaces
{
    public interface IAuthAction
    {
        Task<bool> LogoutAsync(int userId);
        Task<(bool Success, string? Token)> RefreshTokenAsync(string refreshToken);
        Task<object?> GetCurrentUserAsync(int userId);
    }
}