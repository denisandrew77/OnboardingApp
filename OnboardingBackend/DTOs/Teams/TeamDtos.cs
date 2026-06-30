namespace OnboardingBackend.DTOs.Teams;

public sealed record TeamSummaryDto(
    int Id,
    string Name);

public sealed record TeamDetailsDto(
    int Id,
    string Name,
    string? Description,
    DepartmentSummaryDto Department,
    IReadOnlyList<TeamMemberDto> Members);

public sealed record DepartmentSummaryDto(
    int Id,
    string Name);

public sealed record TeamMemberDto(
    int Id,
    string FirstName,
    string LastName,
    string Email,
    string JobTitle);
