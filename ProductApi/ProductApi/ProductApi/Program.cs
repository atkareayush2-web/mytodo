using ProductApi.Middlewares;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// **Phase 5 Middlewares**
// 1️⃣ Header validation (runs first to short-circuit)
app.UseHeaderValidation();

// 2️⃣ Logging middleware (logs requests and responses)
app.UseRequestResponseLogging();

app.UseAuthorization();

app.MapControllers();

app.Run();
