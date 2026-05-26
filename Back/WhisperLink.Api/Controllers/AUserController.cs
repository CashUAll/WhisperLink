using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using WhisperLink.BusinessLayer.Core.Executions;
using WhisperLink.Domain.Models.Users;

namespace WhisperLink.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly UserExecution _userExecution;

        public UserController(UserExecution userExecution)
        {
            _userExecution = userExecution;
        }

        // GET /api/User?search=ana - listă utilizatori cu search opțional
        [HttpGet]
        public async Task<IActionResult> GetAllUsers([FromQuery] string? search = null)
        {
            var users = await _userExecution.GetAllUsersAsync(search);
            return Ok(users);
        }

        // GET /api/User/5 - un singur utilizator
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _userExecution.GetUserByIdAsync(id);
            if (user == null) return NotFound(new { message = "User not found" });

            return Ok(user);
        }

        // GET /api/User/me - utilizatorul curent
        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                return Unauthorized(new { message = "Invalid token" });

            var user = await _userExecution.GetUserByIdAsync(userId);
            if (user == null) return NotFound(new { message = "User not found" });

            return Ok(user);
        }

        // PUT /api/User/5 - actualizare profil
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserDto updateDto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int currentUserId))
                return Unauthorized(new { message = "Invalid token" });

            // Admin poate edita orice profil, User doar pe al lui
            if (id != currentUserId && userRole != "Admin")
                return Forbid();

            var updatedUser = await _userExecution.UpdateUserAsync(id, updateDto);
            if (updatedUser == null) return NotFound(new { message = "User not found" });

            return Ok(updatedUser);
        }

        // PUT /api/User/me - actualizare profil curent
        [HttpPut("me")]
        public async Task<IActionResult> UpdateCurrentUser([FromBody] UpdateUserDto updateDto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                return Unauthorized(new { message = "Invalid token" });

            var updatedUser = await _userExecution.UpdateUserAsync(userId, updateDto);
            if (updatedUser == null) return NotFound(new { message = "User not found" });

            return Ok(updatedUser);
        }

        // PUT /api/User/password - schimbare parolă
        [HttpPut("password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto changePasswordDto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                return Unauthorized(new { message = "Invalid token" });

            var result = await _userExecution.ChangePasswordAsync(userId, changePasswordDto);
            if (!result) return BadRequest(new { message = "Current password is incorrect" });

            return Ok(new { message = "Password changed successfully" });
        }

        // DELETE /api/User/5 - ștergere cont
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int currentUserId))
                return Unauthorized(new { message = "Invalid token" });

            // Admin poate șterge orice cont, User doar pe al lui
            if (id != currentUserId && userRole != "Admin")
                return Forbid();

            var result = await _userExecution.DeleteUserAsync(id);
            if (!result) return NotFound(new { message = "User not found" });

            return Ok(new { message = "User deleted successfully" });
        }
    }
}