using AutoMapper;
using PatternsAPI.Models;

namespace PatternsAPI.DTOs
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<PatternType, PatternTypeDto>().ReverseMap();
            CreateMap<PatternCompany, PatternCompanyDto>().ReverseMap();
            CreateMap<Pattern, PatternDto>().ReverseMap();
        }
    }
}
