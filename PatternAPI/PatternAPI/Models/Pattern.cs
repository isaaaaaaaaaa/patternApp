using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PatternsAPI.Models
{
    public class Pattern : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string? Name { get; set; }
        public int PatternTypeId { get; set; }
        public PatternType? PatternType { get; set; }
        public int PatternCompanyId { get; set; }
        public PatternCompany? PatternCompany { get; set; }
        public string? ImgUrl { get; set; }

        public string GetPatternTypeName()
        {
            return PatternType?.Name ?? "";
        }

        public string GetPatternCompanyName()
        {
            return PatternCompany?.Name ?? "";
        }
    }
}