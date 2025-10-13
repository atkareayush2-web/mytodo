using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;
using TodoApi.DTOs; // Import DTOs namespace

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/todo
        [HttpGet]
        public async Task<IActionResult> GetTodos()
        {
            var todos = await _context.Todos.ToListAsync();
            if (todos == null || !todos.Any())
                return NotFound(new { message = "No tasks found" });
            return Ok(todos);
        }

        // GET: api/todo/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTodoById(int id)
        {
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null)
                return NotFound(new { message = "Task not found" });
            return Ok(todo);
        }

        // POST: api/todo
        [HttpPost]
        public async Task<IActionResult> AddTodo([FromBody] TodoItemDto todoDto)
        {
            if (!ModelState.IsValid) // Validate incoming data
                return BadRequest(ModelState);

            try
            {
                // Map DTO to Model
                var todo = new TodoItem
                {
                    Title = todoDto.Title,
                    Description = todoDto.Description,
                    IsCompleted = todoDto.IsCompleted,
                    UserId = todoDto.UserId
                };

                _context.Todos.Add(todo);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetTodoById), new { id = todo.Id }, todo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred: " + ex.Message });
            }
        }

        // PUT: api/todo/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, [FromBody] TodoItemDto todoDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != todoDto.Id)
                return BadRequest(new { message = "ID mismatch" });

            var todo = await _context.Todos.FindAsync(id);
            if (todo == null)
                return NotFound(new { message = "Task not found" });

            try
            {
                // Update model from DTO
                todo.Title = todoDto.Title;
                todo.Description = todoDto.Description;
                todo.IsCompleted = todoDto.IsCompleted;
                todo.UserId = todoDto.UserId;

                await _context.SaveChangesAsync();
                return NoContent(); // 204 Success
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred: " + ex.Message });
            }
        }

        // DELETE: api/todo/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null)
                return NotFound(new { message = "Task not found" });

            try
            {
                _context.Todos.Remove(todo);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred: " + ex.Message });
            }
        }
    }
}
