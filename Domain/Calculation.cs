namespace Domain
{
    public class Calculation
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Type { get; set; }
        public string Group { get; set; }
        public string Diameter { get; set; }
        public string Pressure { get; set; }
    }
}