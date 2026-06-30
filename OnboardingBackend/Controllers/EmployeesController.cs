using Microsoft.AspNetCore.Mvc;
using OnboardingBackend.DTOs.Employees;
using OnboardingBackend.DTOs.Teams;
using OnboardingBackend.Services;

namespace OnboardingBackend.Controllers;

[ApiController]
[Route("api/employees")]
public sealed class EmployeesController : ControllerBase
{
    private readonly EmployeeService _employeeService;

    public EmployeesController(EmployeeService employeeService)
    {
        _employeeService = employeeService;
    }

    [HttpGet("search")]
    [ProducesResponseType<IReadOnlyList<EmployeeSearchResultDto>>(StatusCodes.Status200OK)]
    [ProducesResponseType<ValidationProblemDetails>(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<IReadOnlyList<EmployeeSearchResultDto>>> Search(
        [FromQuery] string? firstName,
        [FromQuery] string? lastName,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(firstName))
        {
            ModelState.AddModelError(nameof(firstName), "First name is required.");
        }

        if (string.IsNullOrWhiteSpace(lastName))
        {
            ModelState.AddModelError(nameof(lastName), "Last name is required.");
        }

        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        var employees = await _employeeService.SearchByNameAsync(
            firstName!,
            lastName!,
            cancellationToken);

        return Ok(employees);
    }

    [HttpGet("{employeeId:int}")]
    [ProducesResponseType<EmployeeDetailsDto>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<EmployeeDetailsDto>> GetById(
        int employeeId,
        CancellationToken cancellationToken)
    {
        var employee = await _employeeService.GetByIdAsync(
            employeeId,
            cancellationToken);

        return employee is null ? NotFound() : Ok(employee);
    }

    [HttpGet("{employeeId:int}/team")]
    [ProducesResponseType<TeamDetailsDto>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<TeamDetailsDto>> GetTeam(
        int employeeId,
        CancellationToken cancellationToken)
    {
        var team = await _employeeService.GetTeamByEmployeeIdAsync(
            employeeId,
            cancellationToken);

        return team is null ? NotFound() : Ok(team);
    }
}
