using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WhisperLink.BusinessLayer.Core.Helpers;
using WhisperLink.BusinessLayer.Core.Interfaces;
using WhisperLink.DataAccess.Context;
using WhisperLink.Domain.Models.Users;

namespace WhisperLink.BusinessLayer.Core.Actions
{
    // Logica business pentru gestionare utilizatori
    public class UserActions : IUserAction
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public UserActions(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Get all users - listă utilizatori cu search opțional
        public async Task<IEnumerable<UserDto>> GetAllUsersAsync(string? search = null)
        {
            var query = _context.Users.AsQueryable();

            // Filtrare după search (username, email, firstName, lastName)
            if (!string.IsNullOrWhiteSpace(search))
            {
                search = search.ToLower();
                query = query.Where(u =>
                    u.Username.ToLower().Contains(search) ||
                    u.Email.ToLower().Contains(search) ||
                    (u.FirstName != null && u.FirstName.ToLower().Contains(search)) ||
                    (u.LastName != null && u.LastName.ToLower().Contains(search))
                );
            }

            var users = await query.ToListAsync();
            return _mapper.Map<List<UserDto>>(users);
        }

        // Get user by ID - un singur utilizator
        public async Task<UserDto?> GetUserByIdAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return null;

            return _mapper.Map<UserDto>(user);
        }

        // Update user - actualizare profil
        public async Task<UserDto?> UpdateUserAsync(int id, UpdateUserDto updateDto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return null;

            // Actualizează doar câmpurile trimise
            if (updateDto.FirstName != null) user.FirstName = updateDto.FirstName;
            if (updateDto.LastName != null) user.LastName = updateDto.LastName;
            if (updateDto.ProfilePictureUrl != null) user.ProfilePictureUrl = updateDto.ProfilePictureUrl;

            user.UpdatedAt = System.DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return _mapper.Map<UserDto>(user);
        }

        // Change password - schimbare parolă
        public async Task<bool> ChangePasswordAsync(int userId, ChangePasswordDto changePasswordDto)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return false;

            // Verifică parola curentă
            if (!PasswordHasher.VerifyPassword(changePasswordDto.CurrentPassword, user.PasswordHash))
                return false;

            // Hash-uiește noua parolă
            user.PasswordHash = PasswordHasher.HashPassword(changePasswordDto.NewPassword);
            user.UpdatedAt = System.DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return true;
        }

        // Delete user - ștergere cont
        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}