using Microsoft.AspNetCore.Mvc;
using PatternsAPI.DAL.Context;
using PatternsAPI.Models;

namespace PatternsAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PatternCompanyController : ControllerBase
    {
        private readonly ILogger<PatternCompanyController> _logger;
        private PatternsContext _ctx;
        public PatternCompanyController(ILogger<PatternCompanyController> logger, PatternsContext ctx)
        {
            _logger = logger;
            _ctx = ctx;
        }

        [HttpGet(Name = "GetPatternCompanies")]
        public IEnumerable<PatternCompany> Get()
        {
            return (this._ctx.PatternCompanies.ToList());
        }

        [HttpPost(Name = "PostPatternCompany")]
        public async Task<ActionResult<PatternCompany>> Post(PatternCompany company)
        {
            _ctx.PatternCompanies.Add(company);
            var createdId = await _ctx.SaveChangesAsync();
            return CreatedAtAction("typePosted", new { id = createdId });

        }

        [HttpDelete(Name = "DeletePatternCompany/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var company = await _ctx.PatternCompanies.FindAsync(id);
            if (company == null)
            {
                return NotFound();
            }

            _ctx.PatternCompanies.Remove(company);
            await _ctx.SaveChangesAsync();

            return NoContent();
        }
    }
}
