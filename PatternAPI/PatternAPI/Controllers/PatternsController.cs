using Microsoft.AspNetCore.Mvc;
using PatternsAPI.DAL.Context;
using PatternsAPI.Models;

namespace PatternsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatternsController : ControllerBase
    {
        private readonly ILogger<PatternsController> _logger;
        private PatternsContext _ctx;
        public PatternsController(ILogger<PatternsController> logger, PatternsContext ctx)
        {
            _logger = logger;
            _ctx = ctx;
        }

        [HttpGet("GetPatterns")]
        public IEnumerable<Pattern> Get()
        {
            return (this._ctx.Patterns.ToList());
        }

        [HttpPost(Name = "PostPattern")]
        public async Task<ActionResult<Pattern>> Post(Pattern pattern)
        {
            _ctx.Patterns.Add(pattern);
            var createdId = await _ctx.SaveChangesAsync();
            return CreatedAtAction("typePosted", new { id = createdId });

        }

        [HttpDelete(Name = "DeletePattern/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var pattern = await _ctx.Patterns.FindAsync(id);
            if (pattern == null)
            {
                return NotFound();
            }

            _ctx.Patterns.Remove(pattern);
            await _ctx.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("GetPatternsByType/{typeId}")]
        public IEnumerable<Pattern> GetByType(int typeId)
        {
            return (this._ctx.Patterns.Where(p => p.PatternTypeId == typeId).ToList());
        }

        [HttpGet("GetPatternsByCompany/{companyId}")]
        public IEnumerable<Pattern> GetByCompany(int companyId)
        {
            return (this._ctx.Patterns.Where(p => p.PatternCompanyId == companyId).ToList());
        }
    }
}
