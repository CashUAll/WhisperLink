using System.Threading.Tasks;
using WhisperLink.BusinessLayer.Core.Interfaces;

namespace WhisperLink.BusinessLayer.Core.Executions
{
    // Orchestrare pentru AuthActions
    public class AuthExecution
    {
        private readonly IAuthAction _authAction;

        public AuthExecution(IAuthAction authAction)
        {
            _authAction = authAction;
        }

        // Logout - wrapper simplu
        public async Task<bool> LogoutAsync(int userId)
        {
            return await _authAction.LogoutAsync(userId);
        }

        // Refresh token - wrapper simplu
        public async Task<(bool Success, string? Token)> RefreshTokenAsync(string refreshToken)
        {
            return await _authAction.RefreshTokenAsync(refreshToken);
        }

        // Get current user - wrapper simplu
        public async Task<object?> GetCurrentUserAsync(int userId)
        {
            return await _authAction.GetCurrentUserAsync(userId);
        }
    }
}