import type { EmployeeDetails, EmployeeSearchResult } from '../models/employee'
import type { TeamDetails } from '../models/team'
import { apiGet } from './apiClient'

export function searchEmployees(
  firstName: string,
  lastName: string,
  signal?: AbortSignal,
) {
  const query = new URLSearchParams({ firstName, lastName })

  return apiGet<EmployeeSearchResult[]>(`/api/employees/search?${query}`, signal)
}

export function getEmployee(employeeId: number, signal?: AbortSignal) {
  return apiGet<EmployeeDetails>(`/api/employees/${employeeId}`, signal)
}

export function getEmployeeTeam(employeeId: number, signal?: AbortSignal) {
  return apiGet<TeamDetails>(`/api/employees/${employeeId}/team`, signal)
}
