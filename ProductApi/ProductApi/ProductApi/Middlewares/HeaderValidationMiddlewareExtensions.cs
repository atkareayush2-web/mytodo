using Microsoft.AspNetCore.Builder;

namespace ProductApi.Middlewares
{
    public static class HeaderValidationMiddlewareExtensions
    {
        public static IApplicationBuilder UseHeaderValidation(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<HeaderValidationMiddleware>();
        }
    }
}
