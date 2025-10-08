using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        private IMediator? _mediator;

        protected IMediator Mediator => _mediator ??=
            HttpContext.RequestServices.GetService<IMediator>()
            ?? throw new InvalidOperationException("IMediator service is unavailable");
    }
}




/*

??= is the null-coalescing assignment operator. It assigns the value on the right to the variable on the left only if the variable on the left is null. 
If the variable on the left is not null, it retains its original value.

*/