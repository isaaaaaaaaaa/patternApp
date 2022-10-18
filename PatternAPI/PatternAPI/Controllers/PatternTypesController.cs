using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PatternsAPI.Models;
using PatternsAPI.DAL.Context;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using PatternsAPI.DTOs;

namespace PatternAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatternTypesController : ControllerBase
    {
        private readonly ILogger<PatternTypesController> _logger;
        private PatternsContext _ctx;
        private readonly IMapper _mapper;
        public PatternTypesController(
            ILogger<PatternTypesController> logger, 
            PatternsContext ctx,
            IMapper mapper)
        {
            _logger = logger;
            _ctx = ctx;
            _mapper = mapper;
        }

        [HttpGet(Name = "GetPatternTypes")]
        public IEnumerable<PatternType> Get()
        {
            return (this._ctx.PatternTypes.ToList());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PatternType>> Get(int id)
        {
            var patternType = await _ctx.PatternTypes.FindAsync(id);

            if (patternType == null)
            {
                return NotFound();
            }

            return patternType;
        }


        [HttpPost]
        public async Task<ActionResult<PatternType>> Post(PatternTypeDto typeDto)
        {
            var type = _mapper.Map<PatternType>(typeDto);
            _ctx.PatternTypes.Add(type);
            await _ctx.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = type.id }, type);

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, PatternTypeDto typeDto)
        {
            if (id != typeDto.id)
            {
                return BadRequest();
            }
            var type = _mapper.Map<PatternType>(typeDto);

            _ctx.Entry(type).State = EntityState.Modified;

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
            var type = await _ctx.PatternTypes.FindAsync(id);
            if (type == null)
            {
                return NotFound();
            }

            _ctx.PatternTypes.Remove(type);
            await _ctx.SaveChangesAsync();

            return NoContent();
        }


        private bool EntityExists(int id)
        {
            return _ctx.PatternTypes.Any(e => e.id == id);
        }

    }
}
