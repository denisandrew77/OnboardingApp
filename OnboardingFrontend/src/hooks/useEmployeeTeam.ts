import { useEffect, useState } from 'react'
import { getEmployeeTeam } from '../api/employeesApi'
import type { TeamDetails } from '../models/team'

export function useEmployeeTeam(employeeId: number | null) {
  const [team, setTeam] = useState<TeamDetails | null>(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (employeeId === null) {
      return
    }

    const controller = new AbortController()

    getEmployeeTeam(employeeId, controller.signal)
      .then(setTeam)
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setHasError(true)
        }
      })

    return () => controller.abort()
  }, [employeeId])

  return { hasError, team }
}
