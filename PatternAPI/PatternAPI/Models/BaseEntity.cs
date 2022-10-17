namespace PatternsAPI.Models
{
    public class BaseEntity
    {
        public int id { get; set; }
        public DateTime CreationDateTime { get; set; }
        public DateTime LastUpdateDateTime { get; set; }

    }
}
