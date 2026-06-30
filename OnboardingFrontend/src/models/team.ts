export interface TeamSummary {
  id: number
  name: string
}

export interface TeamDetails {
  id: number
  name: string
  description: string | null
  department: DepartmentSummary
  members: TeamMember[]
}

export interface DepartmentSummary {
  id: number
  name: string
}

export interface TeamMember {
  id: number
  firstName: string
  lastName: string
  email: string
  jobTitle: string
}
