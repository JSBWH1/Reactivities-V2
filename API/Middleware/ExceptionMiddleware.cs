using System;
using System.ComponentModel.DataAnnotations;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http; // Needed for HttpContext and StatusCodes
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Core;
using System.Text.Json;

namespace API.Middleware;

public class ExceptionMiddleware(ILogger<ExceptionMiddleware> logger, IHostEnvironment env) : IMiddleware
{
    // Entry point for the middleware. Runs on every HTTP request.
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            // Pass the request to the next middleware in the pipeline.
            await next(context);
        }
        catch(FluentValidation.ValidationException ex)
        {
            // If a FluentValidation exception is thrown, handle it here.
            await HandleValidationException(context, ex); 
        }
        catch (Exception ex)
        {
            await HandleException(context, ex); 
        }
    }

    private async Task HandleException(HttpContext context, Exception ex)
    {
        logger.LogError(ex, ex.Message);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;

        var response = env.IsDevelopment()
            ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace)
            : new AppException(context.Response.StatusCode, ex.Message, null);

        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

        var json = JsonSerializer.Serialize(response, options);

        await context.Response.WriteAsync(json); 
    }

    // Helper method to format FluentValidation errors into a structured JSON response.
    private static async Task HandleValidationException(HttpContext context, FluentValidation.ValidationException ex)
    {
        // Dictionary to hold property names and their associated error messages
        var validationErrors = new Dictionary<string, string[]>();

        if (ex.Errors is not null)
        {
            foreach (var error in ex.Errors)
            {
                // If this property already has errors, append the new message
                if (validationErrors.TryGetValue(error.PropertyName, out var existingErrors))
                {
                    // Add the new error message to the existing array of errors for this property, creating a new array that includes all previous errors plus the new one
                    validationErrors[error.PropertyName] = [.. existingErrors, error.ErrorMessage];
                    // Alternative: validationErrors[error.PropertyName] = existingErrors.Append(error.ErrorMessage).ToArray();
                }
                else
                {
                    // If this property doesn't have errors yet, add a new array with the message
                    validationErrors[error.PropertyName] = [error.ErrorMessage];
                    // Alternative: validationErrors[error.PropertyName] = new[] { error.ErrorMessage };
                }
            }
        }

        // Set the HTTP status code to 400 Bad Request
        context.Response.StatusCode = StatusCodes.Status400BadRequest;

        // Create a structured validation problem details object
        var validationProblemDetails = new ValidationProblemDetails(validationErrors)
        {
            Status = StatusCodes.Status400BadRequest, // Explicitly set the status
            Type = "ValidationFailure",               // Optional custom type
            Title = "Validation error",               // Short summary
            Detail = "One or more validation errors has occurred" // Longer description
        };

        // Write the ValidationProblemDetails object as JSON to the response
        await context.Response.WriteAsJsonAsync(validationProblemDetails); 
    }
}

/*
Overview:
This middleware runs on every HTTP request in the ASP.NET Core pipeline. Its main responsibilities are:
1. Catch FluentValidation exceptions thrown anywhere in the pipeline (e.g., invalid DTOs from the API).
2. Format these validation errors into a structured JSON response using ValidationProblemDetails with HTTP 400 status code.
3. Log any other unhandled exceptions to the console.
4. By handling validation errors here, it keeps controllers and handlers clean from repetitive try/catch logic.
Essentially, it centralizes error handling for validation failures in a consistent and reusable way.
*/
