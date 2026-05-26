using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WhisperLink.BusinessLayer.Core.Executions;
using WhisperLink.BusinessLayer.Core.Helpers;
using WhisperLink.DataAccess.Context;
using WhisperLink.Domain.Entities;
using AutoMapper;

namespace WhisperLink.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthExecution _authExecution;
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly JwtTokenGenerator _jwtGenerator;

        public AuthController(AuthExecution authExecution, AppDbContext context, IMapper mapper, JwtTokenGenerator jwtGenerator)
        {
            _authExecution = authExecution;
            _context = context;
            _mapper = mapper;
            _jwtGenerator = jwtGenerator;
        }

        // POST /api/Auth/register - înregistrare utilizator nou
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            try
            {
                // Validare câmpuri obligatorii
                if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
                    return BadRequest(new { message = "Username, email and password are required" });

                // Verifică username unic
                if (await _context.Users.AnyAsync(u => u.Username == request.Username))
                    return BadRequest(new { message = "Username already exists" });

                // Verifică email unic
                if (await _context.Users.AnyAsync(u => u.Email == request.Email))
                    return BadRequest(new { message = "Email already exists" });

                // Creează user
                var user = new User
                {
                    Username = request.Username,
                    Email = request.Email,
                    PasswordHash = PasswordHasher.HashPassword(request.Password),
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Role = Domain.Enums.UserRole.User,
                    IsOnline = false,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                // Generează tokens
                var token = _jwtGenerator.GenerateToken(user);
                var refreshToken = _jwtGenerator.GenerateRefreshToken();

                // Salvează refresh token
                var refreshTokenEntity = new RefreshToken
                {
                    UserId = user.Id,
                    Token = refreshToken,
                    ExpiresAt = DateTime.UtcNow.AddDays(7),
                    CreatedAt = DateTime.UtcNow
                };

                _context.RefreshTokens.Add(refreshTokenEntity);
                await _context.SaveChangesAsync();

                var userDto = _mapper.Map<Domain.Models.Users.UserDto>(user);
                return Ok(new { token, refreshToken, user = userDto });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Registration failed", error = ex.Message });
            }
        }

        // POST /api/Auth/login - autentificare
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                // Validare câmpuri
                if (string.IsNullOrWhiteSpace(request.UsernameOrEmail) || string.IsNullOrWhiteSpace(request.Password))
                    return BadRequest(new { message = "Username/Email and password are required" });

                // Găsește user după username SAU email
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.UsernameOrEmail || u.Email == request.UsernameOrEmail);
                if (user == null)
                    return Unauthorized(new { message = "Invalid credentials" });

                // Verifică parola
                if (!PasswordHasher.VerifyPassword(request.Password, user.PasswordHash))
                    return Unauthorized(new { message = "Invalid credentials" });

                // Setează online
                user.IsOnline = true;
                user.LastSeenAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();

                // Generează tokens
                var token = _jwtGenerator.GenerateToken(user);
                var refreshToken = _jwtGenerator.GenerateRefreshToken();

                var refreshTokenEntity = new RefreshToken
                {
                    UserId = user.Id,
                    Token = refreshToken,
                    ExpiresAt = DateTime.UtcNow.AddDays(7),
                    CreatedAt = DateTime.UtcNow
                };

                _context.RefreshTokens.Add(refreshTokenEntity);
                await _context.SaveChangesAsync();

                var userDto = _mapper.Map<Domain.Models.Users.UserDto>(user);
                return Ok(new { token, refreshToken, user = userDto });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Login failed", error = ex.Message });
            }
        }

        // POST /api/Auth/logout - deconectare
        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                return Unauthorized(new { message = "Invalid token" });

            var result = await _authExecution.LogoutAsync(userId);
            if (!result) return BadRequest(new { message = "Logout failed" });

            return Ok(new { message = "Logged out successfully" });
        }

        // POST /api/Auth/refresh-token - regenerare access token
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            if (string.IsNullOrEmpty(request.RefreshToken))
                return BadRequest(new { message = "Refresh token is required" });

            var result = await _authExecution.RefreshTokenAsync(request.RefreshToken);
            if (!result.Success)
                return Unauthorized(new { message = "Invalid or expired refresh token" });

            return Ok(new { token = result.Token });
        }

        // GET /api/Auth/me - date utilizator curent
        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                return Unauthorized(new { message = "Invalid token" });

            var user = await _authExecution.GetCurrentUserAsync(userId);
            if (user == null) return NotFound(new { message = "User not found" });

            return Ok(user);
        }

        // GET /api/Auth/stats - statistici publice (fără autentificare)
        [HttpGet("stats")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPublicStats()
        {
            var totalUsers = await _context.Users.CountAsync();
            var onlineUsers = await _context.Users.CountAsync(u => u.IsOnline);
            var totalMessages = await _context.Messages.CountAsync();
            var totalFriendships = await _context.Friendships.CountAsync(f => f.Status == Domain.Enums.FriendshipStatus.Accepted);

            return Ok(new
            {
                totalUsers,
                onlineUsers,
                totalMessages,
                totalFriendships,
                timestamp = DateTime.UtcNow
            });
        }
    }

    // Request models
    public class RegisterRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }

    public class LoginRequest
    {
        public string UsernameOrEmail { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class RefreshTokenRequest
    {
        public string RefreshToken { get; set; } = string.Empty;
    }
}