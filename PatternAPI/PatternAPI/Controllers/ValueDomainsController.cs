using Microsoft.AspNetCore.Mvc;
using PatternsAPI.DAL.Context;
using PatternsAPI.Models;

namespace PatternsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ValueDomainsController : ControllerBase
    {
        private readonly ILogger<ValueDomainsController> _logger;
        private PatternsContext _ctx;
        public ValueDomainsController(ILogger<ValueDomainsController> logger, PatternsContext ctx)
        {
            _logger = logger;
            _ctx = ctx;
        }

        [HttpGet(Name = "GetValueDomains")]
        public IEnumerable<ValueDomain> Get()
        {
            return (this._ctx.ValueDomains.ToList());
        }

        [HttpPost(Name = "PostValueDomain")]
        public async Task<ActionResult<ValueDomain>> Post(ValueDomain vd)
        {
            _ctx.ValueDomains.Add(vd);
            var createdId = await _ctx.SaveChangesAsync();
            return CreatedAtAction("posted", new { id = createdId });

        }

        [HttpDelete(Name = "DeleteValueDomain/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var vd = await _ctx.ValueDomains.FindAsync(id);
            if (vd == null)
            {
                return NotFound();
            }

            _ctx.ValueDomains.Remove(vd);
            await _ctx.SaveChangesAsync();

            return NoContent();
        }
    }
}
