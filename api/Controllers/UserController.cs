using Microsoft.AspNetCore.Mvc;

using api.Models;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly ChecklistTrainerContext _context;
    private readonly ILogger<UserController> _logger;

    public UserController(ChecklistTrainerContext context, ILogger<UserController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // GET: api/user
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUserDetail(string id)
    {
        var res = await _context.Users.FindAsync(id);
        return res == null ? NotFound() : res;
    }
}