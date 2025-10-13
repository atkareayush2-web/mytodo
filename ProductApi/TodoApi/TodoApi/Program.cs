using Microsoft.EntityFrameworkCore;  // Required for EF Core
using TodoApi.Data;                   // To use TodoContext

var builder = WebApplication.CreateBuilder(args);

// Register TodoContext with dependency injection container.
// Use SQL Server provider with the connection string from appsettings.json
builder.Services.AddDbContext<TodoContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add controllers support (so we can build APIs using Controllers)
builder.Services.AddControllers();

var app = builder.Build();

// Map API routes to controllers
app.MapControllers();

// Start the application
app.Run();
