using Microsoft.AspNetCore.Mvc;
using PatternsAPI.DAL.Context;
using PatternsAPI.Models;

namespace PatternsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ValueDomainValuesController : ControllerBase
    {
        private readonly ILogger<ValueDomainValuesController> _logger;
        private PatternsContext _ctx;
        public ValueDomainValuesController(ILogger<ValueDomainValuesController> logger, PatternsContext ctx)
        {
            _logger = logger;
            _ctx = ctx;
        }

        [HttpGet(Name = "GetValueDomainValues/{valueDomainId}")]
        public IEnumerable<ValueDomainValue> Get(int valueDomainId)
        {
            return (this._ctx.ValueDomainValues.Where(e=> e.ValueDomainId == valueDomainId).ToList());
        }

        [HttpPost(Name = "PostValueDomainValue")]
        public async Task<ActionResult<ValueDomainValue>> Post(ValueDomainValue vdv)
        {
            _ctx.ValueDomainValues.Add(vdv);
            var createdId = await _ctx.SaveChangesAsync();
            return CreatedAtAction("posted", new { id = createdId });

        }

        [HttpDelete(Name = "DeleteValueDomainValue/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var vdv = await _ctx.ValueDomainValues.FindAsync(id);
            if (vdv == null)
            {
                return NotFound();
            }

            _ctx.ValueDomainValues.Remove(vdv);
            await _ctx.SaveChangesAsync();

            return NoContent();
        }
    }
}
