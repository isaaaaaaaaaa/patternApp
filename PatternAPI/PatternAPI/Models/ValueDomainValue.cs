namespace PatternsAPI.Models
{
    public class ValueDomainValue : BaseEntity
    {
        public string? Value { get; set; }
        public int ValueDomainId { get; set; }
        public ValueDomain? ValueDomain { get; set; }
        public int EntityId { get; set; }


    }
}