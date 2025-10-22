using System;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await Mediator.Send(new GetActivityList.Query());
        // Mediator.Send() routes the actual query to another file (GetActivityList.cs in the Queries folder). 
        // The query will then be handled in that file (keeps this file smaller and cleaner) 
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
        return HandleResult(await Mediator.Send(new GetActivityDetails.Query { Id = id }));      
        // Mediator.Send() routes the actual query to be handled in the file (GetActivityDetails.cs in the Queries folder)
        // Handle Result Handles the exceptions 
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activityDto)
    {
        return HandleResult(await Mediator.Send(new CreateActivity.Command { ActivityDto = activityDto }));
        // Mediator.Send() routes the actual query to be handled in the file (CreateActivity.cs in the Commands folder) 
    }

    [HttpPut]
    public async Task<ActionResult> EditActivity(EditActivityDto activity)
    {
        // he missed a lesson, so if you see EditActivity changed back to Activity in a later lesson than lesson 101, ignore it and keep it as EditActivityDto. 

        return HandleResult(await Mediator.Send(new EditActivity.Command { ActivityDto = activity }));
        // Mediator.Send() routes the actual query to be handled in the file (EditActivity.cs in the Commands folder) 
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));
        // Mediator.Send() routes the actual query to be handled in the file (DeleteActivity.cs in the Commands folder) 
    }


}

/*


This controller manages all Activity-related API endpoints (GET, POST, PUT, DELETE).

It uses the **Mediator pattern** via the **MediatR** library to keep controller logic thin and clean.

Rather than having the controller directly handle business logic or database access, 
it simply sends a **Command** or **Query** object through `Mediator.Send()`.

This request is then handled elsewhere — for example:
    - `GetActivityList.cs` (in the Queries folder) handles fetching all activities.
    - `GetActivityDetails.cs` handles retrieving a single activity by Id.
    - `CreateActivity.cs`, `EditActivity.cs`, and `DeleteActivity.cs` handle data modifications.

This approach separates **concerns**:
    ✅ Controllers: handle HTTP requests and responses only.
    ✅ Handlers (via MediatR): contain the actual business logic.
    ✅ DTOs: define what data is sent/received.

`HandleResult()` is used to standardise how results and errors are returned to the client,
typically by wrapping them in a consistent format (e.g. Result<T>).

This structure makes the API much easier to maintain, test, and extend.


*/
