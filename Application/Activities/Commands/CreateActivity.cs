using System;
using System.Diagnostics;
using Application.Activities.DTOs;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;
using FluentValidation;
using Application.Core;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<Result<string>>
    {
        public required CreateActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {            
            var activity = mapper.Map<Domain.Activity>(request.ActivityDto);

            context.Activities.Add(activity);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<string>.Failure("Failed to create the activity", 400);

            return Result<string>.Success(activity.Id); 

        }
    }
}




/* 

public class Command : IRequest<string>
{
    public required CreateActivityDto ActivityDto { get; set; }
}


Explanation:

1.  Command = represents the request to create a new activity.
2.  IRequest<string> = MediatR interface; this tells MediatR that:
        This is a request (command),
        The handler will return a string (in this case, the Id of the created activity).
3.  ActivityDto = the data coming from the API (title, date, description, etc.)
4.  required = C# 11 feature; ensures this property must be provided when creating the command.


------------------------------------------------------------------------------------------------------------------------------------


public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, string>

1.  Handler = the class that actually executes the command.

2.  It implements IRequestHandler<Command, string> → tells MediatR:
                “I handle Command requests, and I return a string.”

3.  Constructor parameters:
        AppDbContext context → my EF Core database context. Lets me access tables like Activities.
        IMapper mapper → AutoMapper instance for mapping DTO → entity.

So whenever Mediator.Send(new CreateActivity.Command { ... }) is called, MediatR finds this handler to execute.



------------------------------------------------------------------------------------------------------------------------------------


public async Task<string> Handle(Command request, CancellationToken cancellationToken)

Explanation:

1.  This is the method MediatR calls when the command is sent.
2.  request → the command instance (Command) that contains ActivityDto.


This is the core of the business logic for creating an activity.




*/ 