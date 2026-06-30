namespace OnboardingBackend.Models;

public class Department
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }

    public ICollection<Team> Teams { get; set; } = [];
}
