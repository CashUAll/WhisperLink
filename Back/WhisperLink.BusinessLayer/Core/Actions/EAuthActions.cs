using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using WhisperLink.BusinessLayer.Core.Helpers;
using WhisperLink.BusinessLayer.Core.Interfaces;
using WhisperLink.DataAccess.Context;
using WhisperLink.Domain.Models.Users;

namespace WhisperLink.BusinessLayer.Core.Actions
{
    // Logica business pentru autentificare
    public class AuthActions : IAuthAction
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly JwtTokenGenerator _jwtGenerator;

        public AuthActions(AppDbContext context, IMapper mapper, JwtTokenGenerator jwtGenerator)
        {
            _context = context;
            _mapper = mapper;
            _jwtGenerator = jwtGenerator;
        }

        // Logout - revocă refresh tokens și setează offline
        public async Task<bool> LogoutAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return false;

            // Setează offline
            user.IsOnline = false;
            user.LastSeenAt = DateTime.UtcNow;

            // Revocă toate refresh tokens
            var tokens = await _context.RefreshTokens.Where(rt => rt.UserId == userId && !rt.IsRevoked).ToListAsync();
            foreach (var token in tokens)
            {
                token.IsRevoked = true;
                token.RevokedAt = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync();
            return true;
        }

        // Refresh token - generează nou JWT access token
        public async Task<(bool Success, string? Token)> RefreshTokenAsync(string refreshToken)
        {
            // Găsește refresh token în DB
            var tokenEntity = await _context.RefreshTokens
                .Include(rt => rt.User)
                .FirstOrDefaultAsync(rt => rt.Token == refreshToken);

            // Validări
            if (tokenEntity == null) return (false, null);
            if (tokenEntity.IsRevoked) return (false, null);
            if (tokenEntity.ExpiresAt < DateTime.UtcNow) return (false, null);

            // Generează nou access token
            var newAccessToken = _jwtGenerator.GenerateToken(tokenEntity.User);
            return (true, newAccessToken);
        }

        // Get current user - returnează datele user-ului autentificat
        public async Task<object?> GetCurrentUserAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return null;

            var userDto = _mapper.Map<UserDto>(user);
            return userDto;
        }
    }
}