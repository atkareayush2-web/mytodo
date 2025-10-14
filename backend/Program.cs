using Enquiry.API.Models; // Updated namespace for DbContext & models
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ------------------------
// Add services
// ------------------------
builder.Services.AddControllers();

// ✅ CORS setup for Angular dev server
builder.Services.AddCors(options =>
{
    options.AddPolicy("allowCors", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Angular dev URL
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// ------------------------
// Swagger (API docs)
// ------------------------
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ------------------------
// Database connection
// ------------------------
builder.Services.AddDbContext<UserDbContext>(options =>
{
    // Make sure the connection string key matches appsettings.json
    options.UseSqlServer(builder.Configuration.GetConnectionString("UserCon"));
});

var app = builder.Build();

// ------------------------
// Middleware pipeline
// ------------------------

// Enable Swagger in development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ✅ Use CORS BEFORE Authorization
app.UseCors("allowCors");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
