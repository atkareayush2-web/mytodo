using Microsoft.AspNetCore.Http;
using System.Diagnostics;
using System.Threading.Tasks;

namespace ProductApi.Middlewares
{
    public class RequestResponseLoggingMiddleware
    {
        private readonly RequestDelegate _next;

        public RequestResponseLoggingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Log request info
            Debug.WriteLine($"[Request] {context.Request.Method} {context.Request.Path}");

            var stopwatch = Stopwatch.StartNew();

            // Call the next middleware in the pipeline
            await _next(context);

            stopwatch.Stop();

            // Log response info
            Debug.WriteLine($"[Response] {context.Response.StatusCode} | Time taken: {stopwatch.ElapsedMilliseconds}ms");
        }
    }
}
