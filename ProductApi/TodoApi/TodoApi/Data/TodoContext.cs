using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Data
{
    // This class represents a session with the database.
    // It allows us to query and save instances of our Models (User, TodoItem).
    public class TodoContext : DbContext
    {
        // Constructor - passes options (like connection string, provider) to the base DbContext
        public TodoContext(DbContextOptions<TodoContext> options) : base(options) { }

        // DbSet<User> represents the "Users" table in SQL Server
        public DbSet<User> Users { get; set; }

        // DbSet<TodoItem> represents the "Todos" table in SQL Server
        public DbSet<TodoItem> Todos { get; set; }
    }
}
