namespace PatternsAPI.DTOs
{
    public class PatternDto
    {
        public int id { get; set; }
        public string? Name { get; set; }

        public int? PatternTypeId { get; set; }
        public PatternTypeDto? PatternType { get; set; }
        public string? PatternTypeName { get; set; }
        public int? PatternCompanyId { get; set; }
        public PatternCompanyDto? PatternCompany { get; set; }
        public string? PatternCompanyName  { get; set; }
        public string? ImgUrl { get; set; }
    }
}
