import { useEffect, useState } from 'react'
import { getSupportContacts } from '../api/employeesApi'
import type { SupportContact } from '../models/employee'

export function useSupportContacts() {
  const [contacts, setContacts] = useState<SupportContact[]>([])
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    getSupportContacts(controller.signal)
      .then(setContacts)
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setHasError(true)
        }
      })
      .finally(() => setIsLoading(false))

    return () => controller.abort()
  }, [])

  return { contacts, hasError, isLoading }
}
