using Enquiry.API.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Enquiry.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("allowCors")]
    public class UserController : ControllerBase
    {
        private readonly UserDbContext _context;

        public UserController(UserDbContext context)
        {
            _context = context;
        }

        // ----------------------
        // Create new user
        // ----------------------
        [HttpPost("CreateNewUser")]
        public async Task<IActionResult> CreateUser([FromBody] User obj)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingUser = await _context.Users
                .SingleOrDefaultAsync(u => u.emailId == obj.emailId);

            if (existingUser != null)
                return Conflict("User with this email already exists.");

            obj.createdDate = DateTime.Now;
            await _context.Users.AddAsync(obj);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserById), new { id = obj.userId }, obj);
        }

        // ----------------------
        // Login
        // ----------------------
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] UserLogin obj)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _context.Users
                .SingleOrDefaultAsync(u => u.emailId == obj.emailId && u.password == obj.password);

            if (user == null)
                return Unauthorized("Invalid email or password.");

            return Ok(new
            {
                message = "Login successful",
                userData = user
            });
        }

        // ----------------------
        // Get all users
        // ----------------------
        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        // ----------------------
        // Get single user by ID
        // ----------------------
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound("User not found.");

            return Ok(user);
        }

        // ----------------------
        // Update user by ID
        // ----------------------
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
        {
            if (id != updatedUser.userId)
                return BadRequest("User ID mismatch.");

            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser == null)
                return NotFound("User not found.");

            // Update fields
            existingUser.fullName = updatedUser.fullName;
            existingUser.emailId = updatedUser.emailId;
            existingUser.password = updatedUser.password;
            existingUser.mobileNo = updatedUser.mobileNo;

            await _context.SaveChangesAsync();

            return Ok(existingUser);
        }

        // ----------------------
        // Delete user by ID
        // ----------------------
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound("User not found.");

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok("User deleted successfully.");
        }
    }
}
