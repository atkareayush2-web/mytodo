using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace ProductApi.Middlewares
{
    public class HeaderValidationMiddleware
    {
        private readonly RequestDelegate _next;

        public HeaderValidationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Check for a custom header
            if (!context.Request.Headers.ContainsKey("X-Client"))
            {
                context.Response.StatusCode = 400; // Bad Request
                await context.Response.WriteAsync("Missing required header: X-Client");
                return; // Stop further processing (short-circuit)
            }

            // Continue to next middleware or controller
            await _next(context);
        }
    }
}
