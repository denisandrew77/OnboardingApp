namespace OnboardingBackend.Models;

public class Employee
{
    public int Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required string JobTitle { get; set; }
    public DateOnly StartDate { get; set; }

    public int TeamId { get; set; }
    public Team Team { get; set; } = null!;

    public int? ManagerId { get; set; }
    public Employee? Manager { get; set; }
    public ICollection<Employee> DirectReports { get; set; } = [];

    public string CurrentOnboardingStep { get; set; } = "welcome";
    public DateTimeOffset? OnboardingCompletedAt { get; set; }
}
