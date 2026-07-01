import { useEffect, useState } from 'react'
import { getSupportContacts } from '../../api/employeesApi'
import { OnboardingLayout } from '../../components/OnboardingLayout'
import { onboardingContent } from '../../content/onboarding'
import type { SupportContact } from '../../models/employee'
import './ResourcesPage.css'

export function ResourcesPage() {
  const { resources } = onboardingContent
  const [contacts, setContacts] = useState<SupportContact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const displayedContacts: SupportContact[] = contacts.some(
    (contact) => contact.contactType === 'system-administrator',
  ) ? contacts : [
    ...contacts,
    {
      id: -1,
      firstName: 'System',
      lastName: 'Administrator',
      email: 'it-support@meridian.example',
      jobTitle: 'IT Support',
      contactType: 'system-administrator',
    },
  ]

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

  return (
    <OnboardingLayout step="resources">
      <section>
        <div className="step-header">
          <p className="eyebrow">{resources.eyebrow}</p>
          <h1>{resources.title}</h1>
          <p className="step-description">{resources.description}</p>
        </div>

        {isLoading ? (
          <p className="resources-state">{resources.loading}</p>
        ) : hasError || contacts.length === 0 ? (
          <p className="resources-state resources-state--error">{resources.unavailable}</p>
        ) : (
          <div className="contact-grid">
            {displayedContacts.map((contact) => (
              <article className="contact-card content-card" key={contact.id}>
                <span className="contact-avatar" aria-hidden="true">
                  {contact.firstName[0]}{contact.lastName[0]}
                </span>
                <div>
                  <p className="contact-type">
                    {contact.contactType === 'hr' ? 'Human Resources' : 'Technical support'}
                  </p>
                  <h2>{contact.firstName} {contact.lastName}</h2>
                  <p className="contact-role">{contact.jobTitle}</p>
                  <p className="contact-description">{resources.contactDescriptions[contact.contactType]}</p>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </div>
              </article>
            ))}
          </div>
        )}

        <blockquote>{resources.reminder}</blockquote>
      </section>
    </OnboardingLayout>
  )
}
