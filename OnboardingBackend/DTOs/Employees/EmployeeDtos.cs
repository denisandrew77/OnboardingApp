using OnboardingBackend.DTOs.Teams;

namespace OnboardingBackend.DTOs.Employees;

public sealed record EmployeeSearchResultDto(
    int Id,
    string FirstName,
    string LastName,
    string JobTitle,
    int TeamId,
    string TeamName);

public sealed record EmployeeDetailsDto(
    int Id,
    string FirstName,
    string LastName,
    string Email,
    string JobTitle,
    DateOnly StartDate,
    string CurrentOnboardingStep,
    DateTimeOffset? OnboardingCompletedAt,
    TeamSummaryDto Team,
    ManagerSummaryDto? Manager);

public sealed record ManagerSummaryDto(
    int Id,
    string FirstName,
    string LastName,
    string Email,
    string JobTitle);
