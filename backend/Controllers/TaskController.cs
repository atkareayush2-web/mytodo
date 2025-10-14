using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Enquiry.API.Models; // ✅ Contains UserDbContext & your Task model
using TaskModel = Enquiry.API.Models.TodoTask; // ✅ Alias to avoid conflict with System.Threading.Tasks.Task

namespace Enquiry.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly UserDbContext _context;

        public TaskController(UserDbContext context)
        {
            _context = context;
        }

        // -------------------------------------------------
        // GET all tasks for a specific user
        // -------------------------------------------------
        [HttpGet("user/{userId}")]
        public IActionResult GetTasksByUser(int userId)
        {
            var tasks = _context.Tasks
                                .Where(t => t.UserId == userId)
                                .ToList();

            return Ok(tasks);
        }

        // -------------------------------------------------
        // GET a single task by ID ✅
        // Route: GET api/task/{id}
        // -------------------------------------------------
        [HttpGet("{id}")]
        public IActionResult GetTaskById(int id)
        {
            var task = _context.Tasks.SingleOrDefault(t => t.TaskId == id);
            if (task == null)
                return NotFound("Task not found");

            return Ok(task);
        }

        // -------------------------------------------------
        // CREATE a new task
        // -------------------------------------------------
        [HttpPost]
        public IActionResult CreateTask([FromBody] TaskModel task)
        {
            if (task == null)
                return BadRequest("Invalid task data.");

            _context.Tasks.Add(task);
            _context.SaveChanges();

            return Created("", task);
        }

        // -------------------------------------------------
        // UPDATE an existing task
        // -------------------------------------------------
        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, [FromBody] TaskModel updatedTask)
        {
            var existingTask = _context.Tasks.Find(id);
            if (existingTask == null)
                return NotFound("Task not found.");

            existingTask.Title = updatedTask.Title;
            existingTask.Description = updatedTask.Description;
            existingTask.IsCompleted = updatedTask.IsCompleted; // make sure property matches
            existingTask.DueDate = updatedTask.DueDate;

            _context.SaveChanges();

            return Ok(existingTask);
        }

        // -------------------------------------------------
        // DELETE a task by ID
        // -------------------------------------------------
        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            var task = _context.Tasks.Find(id);
            if (task == null)
                return NotFound("Task not found.");

            _context.Tasks.Remove(task);
            _context.SaveChanges();

            return Ok("Task deleted successfully.");
        }
    }
}
