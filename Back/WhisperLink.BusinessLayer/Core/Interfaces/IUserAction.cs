using System.Collections.Generic;
using System.Threading.Tasks;
using WhisperLink.Domain.Models.Users;

namespace WhisperLink.BusinessLayer.Core.Interfaces
{
    public interface IUserAction
    {
        Task<IEnumerable<UserDto>> GetAllUsersAsync(string? search = null);
        Task<UserDto?> GetUserByIdAsync(int id);
        Task<UserDto?> UpdateUserAsync(int id, UpdateUserDto updateDto);
        Task<bool> ChangePasswordAsync(int userId, ChangePasswordDto changePasswordDto);
        Task<bool> DeleteUserAsync(int id);
    }
}