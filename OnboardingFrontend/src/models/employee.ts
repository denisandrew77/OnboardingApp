import type { TeamSummary } from './team'

export interface EmployeeSearchResult {
  id: number
  firstName: string
  lastName: string
  jobTitle: string
  teamId: number
  teamName: string
}

export interface EmployeeDetails {
  id: number
  firstName: string
  lastName: string
  email: string
  jobTitle: string
  startDate: string
  currentOnboardingStep: string
  onboardingCompletedAt: string | null
  team: TeamSummary
  manager: ManagerSummary | null
}

export interface ManagerSummary {
  id: number
  firstName: string
  lastName: string
  email: string
  jobTitle: string
}
