namespace OnboardingBackend.Models;

public class Team
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }

    public int DepartmentId { get; set; }
    public Department Department { get; set; } = null!;

    public ICollection<Employee> Members { get; set; } = [];
}
