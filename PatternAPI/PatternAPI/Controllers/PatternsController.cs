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
    public class PatternsController : ControllerBase
    {
        private readonly ILogger<PatternsController> _logger;
        private PatternsContext _ctx;
        private readonly IMapper _mapper;
        public PatternsController(
            ILogger<PatternsController> logger, 
            PatternsContext ctx,
            IMapper mapper)
        {
            _logger = logger;
            _ctx = ctx;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pattern>>> Get()
        {
            var items = await _ctx.Patterns.Include(e=> e.PatternCompany).Include(e=> e.PatternType).ToListAsync();
            return CreatedAtAction(nameof(Get), _mapper.Map<IEnumerable<PatternDto>>(items));
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Pattern>> Get(int id)
        {
            var pattern = await _ctx.Patterns.FindAsync(id);

            if (pattern == null)
            {
                return NotFound();
            }

            return pattern;
        }

        [HttpPost]
        public async Task<ActionResult<Pattern>> Post(PatternDto patternDto)
        {
            var pattern = _mapper.Map<Pattern>(patternDto);
            _ctx.Patterns.Add(pattern);
            await _ctx.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = pattern.id }, pattern);

        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, PatternDto patternDto)
        {
            if (id != patternDto.id)
            {
                return BadRequest();
            }
            var pattern = _mapper.Map<Pattern>(patternDto);
            _ctx.Entry(pattern).State = EntityState.Modified;

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


        private bool EntityExists(int id)
        {
            return _ctx.Patterns.Any(e => e.id == id);
        }
    }
}
