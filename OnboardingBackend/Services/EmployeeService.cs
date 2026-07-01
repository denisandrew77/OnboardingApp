using Microsoft.EntityFrameworkCore;
using OnboardingBackend.Data;
using OnboardingBackend.DTOs.Employees;
using OnboardingBackend.DTOs.Teams;

namespace OnboardingBackend.Services;

public sealed class EmployeeService
{
    private readonly AppDbContext _dbContext;

    public EmployeeService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<EmployeeSearchResultDto>> SearchByNameAsync(
        string firstName,
        string lastName,
        CancellationToken cancellationToken)
    {
        var normalizedFirstName = firstName.Trim().ToLowerInvariant();
        var normalizedLastName = lastName.Trim().ToLowerInvariant();

        return await _dbContext.Employees
            .AsNoTracking()
            .Where(employee =>
                employee.FirstName.ToLower() == normalizedFirstName &&
                employee.LastName.ToLower() == normalizedLastName)
            .OrderBy(employee => employee.JobTitle)
            .Select(employee => new EmployeeSearchResultDto(
                employee.Id,
                employee.FirstName,
                employee.LastName,
                employee.JobTitle,
                employee.TeamId,
                employee.Team.Name))
            .ToListAsync(cancellationToken);
    }

    public Task<EmployeeDetailsDto?> GetByIdAsync(
        int employeeId,
        CancellationToken cancellationToken)
    {
        return _dbContext.Employees
            .AsNoTracking()
            .Where(employee => employee.Id == employeeId)
            .Select(employee => new EmployeeDetailsDto(
                employee.Id,
                employee.FirstName,
                employee.LastName,
                employee.Email,
                employee.JobTitle,
                employee.StartDate,
                employee.CurrentOnboardingStep,
                employee.OnboardingCompletedAt,
                new TeamSummaryDto(
                    employee.Team.Id,
                    employee.Team.Name),
                employee.Manager == null
                    ? null
                    : new ManagerSummaryDto(
                        employee.Manager.Id,
                        employee.Manager.FirstName,
                        employee.Manager.LastName,
                        employee.Manager.Email,
                        employee.Manager.JobTitle)))
            .SingleOrDefaultAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<SupportContactDto>> GetSupportContactsAsync(
        CancellationToken cancellationToken)
    {
        var hrContact = await _dbContext.Employees
            .AsNoTracking()
            .Where(employee => employee.Team.Department.Name.ToLower() == "hr")
            .OrderBy(employee => employee.Id)
            .Select(employee => new SupportContactDto(
                employee.Id,
                employee.FirstName,
                employee.LastName,
                employee.Email,
                employee.JobTitle,
                "hr"))
            .FirstOrDefaultAsync(cancellationToken);

        var systemAdministrator = await _dbContext.Employees
            .AsNoTracking()
            .Where(employee => employee.JobTitle.ToLower().Contains("administrator"))
            .OrderBy(employee => employee.Id)
            .Select(employee => new SupportContactDto(
                employee.Id,
                employee.FirstName,
                employee.LastName,
                employee.Email,
                employee.JobTitle,
                "system-administrator"))
            .FirstOrDefaultAsync(cancellationToken);

        return new[] { hrContact, systemAdministrator }
            .Where(contact => contact is not null)
            .Cast<SupportContactDto>()
            .ToArray();
    }

    public Task<TeamDetailsDto?> GetTeamByEmployeeIdAsync(
        int employeeId,
        CancellationToken cancellationToken)
    {
        return _dbContext.Employees
            .AsNoTracking()
            .Where(employee => employee.Id == employeeId)
            .Select(employee => new TeamDetailsDto(
                employee.Team.Id,
                employee.Team.Name,
                employee.Team.Description,
                new DepartmentSummaryDto(
                    employee.Team.Department.Id,
                    employee.Team.Department.Name),
                employee.Team.Members
                    .OrderBy(member => member.FirstName)
                    .ThenBy(member => member.LastName)
                    .Select(member => new TeamMemberDto(
                        member.Id,
                        member.FirstName,
                        member.LastName,
                        member.Email,
                        member.JobTitle))
                    .ToList()))
            .SingleOrDefaultAsync(cancellationToken);
    }
}
