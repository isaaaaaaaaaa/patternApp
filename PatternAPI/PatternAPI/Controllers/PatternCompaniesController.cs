using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PatternsAPI.DAL.Context;
using PatternsAPI.DTOs;
using PatternsAPI.Models;

namespace PatternsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatternCompaniesController : ControllerBase
    {
        private readonly ILogger<PatternCompaniesController> _logger;
        private PatternsContext _ctx;
        private readonly IMapper _mapper;

        public PatternCompaniesController(
            ILogger<PatternCompaniesController> logger, 
            PatternsContext ctx,
            IMapper mapper)
        {
            _logger = logger;
            _ctx = ctx;
            _mapper = mapper;
        }


        [HttpGet(Name = "GetPatternCompanies")]
        public IEnumerable<PatternCompany> Get()
        {
            return (this._ctx.PatternCompanies.ToList());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PatternCompany>> Get(int id)
        {
            var patternCompany = await _ctx.PatternCompanies.FindAsync(id);

            if (patternCompany == null)
            {
                return NotFound();
            }

            return patternCompany;
        }

        [HttpPost]
        public async Task<ActionResult<PatternCompany>> Post(PatternCompanyDto companyDto)
        {
            var company = _mapper.Map<PatternCompany>(companyDto);
            _ctx.PatternCompanies.Add(company);
            await _ctx.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = company.id }, company);

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, PatternCompanyDto companyDto)
        {
            if (id != companyDto.id)
            {
                return BadRequest();
            }
            var company = _mapper.Map<PatternCompany>(companyDto);

            _ctx.Entry(company).State = EntityState.Modified;

            try
            {
                await _ctx.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EntityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        

        [HttpDelete("{id}")]
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

        private bool EntityExists(int id)
        {
            return _ctx.PatternCompanies.Any(e => e.id == id);
        }
    }
}
