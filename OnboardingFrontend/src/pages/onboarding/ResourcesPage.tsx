import { EmployeeAvatar } from '../../components/EmployeeAvatar'
import { OnboardingLayout } from '../../components/OnboardingLayout'
import { OnboardingStepHeader } from '../../components/OnboardingStepHeader'
import { onboardingContent } from '../../content/onboarding'
import { useSupportContacts } from '../../hooks/useSupportContacts'
import type { SupportContact } from '../../models/employee'
import './ResourcesPage.css'

export function ResourcesPage() {
  const { resources } = onboardingContent
  const { contacts, hasError, isLoading } = useSupportContacts()

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

  return (
    <OnboardingLayout step="resources">
      <section>
        <OnboardingStepHeader
          description={resources.description}
          eyebrow={resources.eyebrow}
          title={resources.title}
        />

        {isLoading ? (
          <p className="resources-state">{resources.loading}</p>
        ) : hasError || contacts.length === 0 ? (
          <p className="resources-state resources-state--error">{resources.unavailable}</p>
        ) : (
          <div className="contact-grid">
            {displayedContacts.map((contact) => (
              <article className="contact-card content-card" key={contact.id}>
                <EmployeeAvatar
                  className="contact-avatar"
                  firstName={contact.firstName}
                  lastName={contact.lastName}
                />
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
