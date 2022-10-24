using AutoMapper;
using AwsS3.Models;
using AwsS3.Models.Dtos;
using AwsS3.Services.Interfaces;
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
        private readonly IConfiguration _config;
        private readonly IStorageService _storageService;
        public PatternsController(
            ILogger<PatternsController> logger, 
            PatternsContext ctx,
            IMapper mapper,
            IConfiguration config,
            IStorageService storageService)
        {
            _logger = logger;
            _ctx = ctx;
            _mapper = mapper;
            _config = config;
            _storageService = storageService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pattern>>> Get()
        {
            var items = await _ctx.Patterns.OrderBy(e=>e.id).Include(e=> e.PatternCompany).Include(e=> e.PatternType).ToListAsync();
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
        public async Task<ActionResult<Pattern>> Post([FromForm] PatternDto patternDto)
        {
            var pattern = _mapper.Map<Pattern>(patternDto);
            
            var res = await UploadFile(patternDto.imgFile!);

            pattern.ImgUrl = $"https://patterns-manager.s3.amazonaws.com/{res}";
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

        private async Task<string> UploadFile(IFormFile file)
        {
            // Process file
            await using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);

            var fileExt = Path.GetExtension(file.FileName);
            var docName = $"{Guid.NewGuid()}.{fileExt}";
            // call server

            var s3Obj = new S3Object()
            {
                BucketName = "patterns-manager",
                InputStream = memoryStream,
                Name = docName
            };

            var cred = new AwsCredentials()
            {
                AccessKey = _config["AwsConfiguration:AWSAccessKey"],
                SecretKey = _config["AwsConfiguration:AWSSecretKey"]
            };

            var result = await _storageService.UploadFileAsync(s3Obj, cred);
            // 
            return result.FileName!;

        }
    }
}
