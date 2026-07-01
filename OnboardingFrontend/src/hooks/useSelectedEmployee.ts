import { useEffect, useState } from 'react'
import { getEmployee } from '../api/employeesApi'
import type { EmployeeDetails } from '../models/employee'

export function getSelectedEmployeeId() {
  const storedValue = localStorage.getItem('meridian.employeeId')
  const employeeId = Number(storedValue)

  return Number.isInteger(employeeId) && employeeId > 0 ? employeeId : null
}

export function useSelectedEmployee() {
  const employeeId = getSelectedEmployeeId()
  const [employee, setEmployee] = useState<EmployeeDetails | null>(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (employeeId === null) {
      return
    }

    const controller = new AbortController()

    getEmployee(employeeId, controller.signal)
      .then(setEmployee)
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setHasError(true)
        }
      })

    return () => controller.abort()
  }, [employeeId])

  return {
    employee,
    employeeId,
    hasError,
    isLoading: employeeId !== null && employee === null && !hasError,
  }
}
