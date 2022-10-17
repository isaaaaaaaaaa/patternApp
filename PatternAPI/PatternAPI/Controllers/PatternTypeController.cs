using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PatternsAPI.Models;
using PatternsAPI.DAL.Context;

namespace PatternAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PatternTypeController : ControllerBase
    {
        private readonly ILogger<PatternTypeController> _logger;
        private PatternsContext _ctx;
        public PatternTypeController(ILogger<PatternTypeController> logger, PatternsContext ctx)
        {
            _logger = logger;
            _ctx = ctx;
        }

        [HttpGet(Name = "GetPatternTypes")]
        public IEnumerable<PatternType> Get()
        {
            return (this._ctx.PatternTypes.ToList());
        }

        [HttpPost(Name = "PostPatternType")]
        public async Task<ActionResult<PatternType>>  Post(PatternType type)
        {
            _ctx.PatternTypes.Add(type);
            var createdId = await _ctx.SaveChangesAsync();
            return CreatedAtAction("typePosted", new { id = createdId });

        }

        [HttpDelete(Name = "DeletePatternTypes/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var type = await _ctx.PatternTypes.FindAsync(id);
            if (type == null)
            {
                return NotFound();
            }

            _ctx.PatternTypes.Remove(type);
            await _ctx.SaveChangesAsync();

            return NoContent();
        }
    }
}
