using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using api.Models;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AircraftController : ControllerBase
{
    private readonly ChecklistTrainerContext _context;
    private readonly ILogger<AircraftController> _logger;

    public AircraftController(ChecklistTrainerContext context, ILogger<AircraftController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // GET: api/aircraft
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Aircraft>>> GetAircraft()
    {
        return await _context.Aircraft.ToListAsync();
    }
    
    // GET: api/aircraft/c2c567c5-cbea-4dd9-8081-3e8b34f561aa
    [HttpGet("{id}")]
    public async Task<ActionResult<Aircraft>> GetAircraft(string id)
    {
        var res = await _context.Aircraft.FindAsync(id);

        if (res == null)
        {
            return NotFound();
        }

        return res;
    }
}
