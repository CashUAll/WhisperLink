using System.Collections.Generic;
using System.Threading.Tasks;
using WhisperLink.BusinessLayer.Core.Interfaces;
using WhisperLink.Domain.Models.Users;

namespace WhisperLink.BusinessLayer.Core.Executions
{
    // Orchestrare pentru UserActions
    public class UserExecution
    {
        private readonly IUserAction _userAction;

        public UserExecution(IUserAction userAction)
        {
            _userAction = userAction;
        }

        // Get all users - wrapper simplu
        public async Task<IEnumerable<UserDto>> GetAllUsersAsync(string? search = null)
        {
            return await _userAction.GetAllUsersAsync(search);
        }

        // Get user by ID - wrapper simplu
        public async Task<UserDto?> GetUserByIdAsync(int id)
        {
            return await _userAction.GetUserByIdAsync(id);
        }

        // Update user - wrapper simplu
        public async Task<UserDto?> UpdateUserAsync(int id, UpdateUserDto updateDto)
        {
            return await _userAction.UpdateUserAsync(id, updateDto);
        }

        // Change password - wrapper simplu
        public async Task<bool> ChangePasswordAsync(int userId, ChangePasswordDto changePasswordDto)
        {
            return await _userAction.ChangePasswordAsync(userId, changePasswordDto);
        }

        // Delete user - wrapper simplu
        public async Task<bool> DeleteUserAsync(int id)
        {
            return await _userAction.DeleteUserAsync(id);
        }
    }
}