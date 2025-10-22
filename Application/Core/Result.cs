using System;

namespace Application.Core;

public class Result<T>
{
    public bool IsSuccess { get; set; }
    public T? Value { get; set; }
    public string? Error { get; set; }
    public int Code { get; set; }

    public static Result<T> Success(T value) => new() { IsSuccess = true, Value = value };

    public static Result<T> Failure(string error, int code) => new()
    {
        IsSuccess = false,
        Error = error,
        Code = code
    };
}


/*

public class Result<T>
    A generic class — the <T> means it can hold any type of result (e.g. Result<string>, Result<Activity>, Result<List<User>>, etc).
    

This class provides a standard way to return outcomes from methods.

✅ If successful: use Result<T>.Success(value)
❌ If failed: use Result<T>.Failure(errorMessage, errorCode)

It avoids throwing exceptions for expected failures and makes it easier for controllers or services
to handle both success and error cases in a consistent way.

int Code will basically be holding the HTTP status codess (e.g. 404 for 'Not Found', 500 for 'Internal Server Error' etc...)


*/ 