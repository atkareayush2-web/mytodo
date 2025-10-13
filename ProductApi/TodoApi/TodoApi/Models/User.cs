using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [ApiController] // Marks this class as an API Controller
    [Route("api/[controller]")] // Routes requests to /api/user
    public class UserController : ControllerBase
    {
        private readonly TodoContext _context; // EF Core DbContext for DB access

        // Constructor: TodoContext is injected via Dependency Injection
        public UserController(TodoContext context)
        {
            _context = context;
        }

        // ===============================
        // 1. GET: api/user
        // Fetch all users from the database
        // ===============================
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.ToListAsync(); // Fetch all users
            if (users == null || !users.Any()) // Check if empty
                return NotFound(new { message = "No users found" }); // 404 if empty
            return Ok(users); // 200 OK with user list
        }

        // ===============================
        // 2. GET: api/user/{id}
        // Fetch a single user by ID
        // ===============================
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id); // Find user by primary key
            if (user == null) // If not found
                return NotFound(new { message = "User not found" }); // 404 response
            return Ok(user); // 200 OK with user
        }

        // ===============================
        // 3. POST: api/user
        // Add a new user
        // ===============================
        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] User user)
        {
            if (!ModelState.IsValid) // Validate input
                return BadRequest(ModelState); // 400 Bad Request if invalid

            try
            {
                _context.Users.Add(user); // Stage new user
                await _context.SaveChangesAsync(); // Save to DB
                return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user); // 201 Created
            }
            catch (Exception ex) // Handle unexpected errors
            {
                return StatusCode(500, new { message = "An error occurred: " + ex.Message });
            }
        }

        // ===============================
        // 4. PUT: api/user/{id}
        // Update an existing user
        // ===============================
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User user)
        {
            if (id != user.Id) // Check ID mismatch
                return BadRequest(new { message = "ID mismatch" }); // 400 Bad Request

            _context.Entry(user).State = EntityState.Modified; // Mark entity as modified

            try
            {
                await _context.SaveChangesAsync(); // Save changes
            }
            catch (DbUpdateConcurrencyException) // Handle concurrency issues
            {
                if (!_context.Users.Any(u => u.Id == id)) // Check if user still exists
                    return NotFound(new { message = "User not found" }); // 404
                else
                    throw; // Other concurrency error, rethrow
            }
            catch (Exception ex) // Handle other unexpected errors
            {
                return StatusCode(500, new { message = "An error occurred: " + ex.Message });
            }

            return NoContent(); // 204 No Content if successful
        }

        // ===============================
        // 5. DELETE: api/user/{id}
        // Delete a user by ID
        // ===============================
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id); // Find user by ID
            if (user == null) // If not found
                return NotFound(new { message = "User not found" }); // 404

            try
            {
                _context.Users.Remove(user); // Remove user
                await _context.SaveChangesAsync(); // Commit delete
                return NoContent(); // 204 No Content
            }
            catch (Exception ex) // Handle unexpected errors
            {
                return StatusCode(500, new { message = "An error occurred: " + ex.Message });
            }
        }
    }
}
