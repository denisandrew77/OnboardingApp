import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate } from 'react-router'
import { getSupportContacts } from '../api/employeesApi'
import { AppShell } from '../components/AppShell'
import { resourceHubContent, type HubResource, type ResourceIcon } from '../content/resourceHub'
import { onboardingContent } from '../content/onboarding'
import { getSelectedEmployeeId, useSelectedEmployee } from '../hooks/useSelectedEmployee'
import type { SupportContact } from '../models/employee'
import './EmployeeHubPage.css'

const iconPaths: Record<ResourceIcon, string> = {
  person: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7 8a7 7 0 0 0-14 0',
  office: 'M4 21V4h11v17M8 8h3m-3 4h3m-3 4h3m4-7h5v12M3 21h18',
  calendar: 'M6 3v3m12-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z',
  coffee: 'M5 8h11v5a6 6 0 0 1-6 6 5 5 0 0 1-5-5V8Zm11 2h2a2 2 0 0 1 0 4h-2M8 3v2m4-2v2',
  message: 'M4 5h16v11H8l-4 4V5Zm4 4h8m-8 3h5',
  video: 'M4 6h11v12H4V6Zm11 4 5-3v10l-5-3',
  benefits: 'M12 21s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.5-8 11-8 11Z',
  learning: 'm3 9 9-5 9 5-9 5-9-5Zm4 3v5c3 2 7 2 10 0v-5',
  document: 'M6 3h8l4 4v14H6V3Zm8 0v5h4M9 12h6m-6 4h6',
}

function ResourceIconGraphic({ icon }: { icon: ResourceIcon }) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <path d={iconPaths[icon]} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
    </svg>
  )
}

function ResourceCard({ resource, onOpenTechStack }: { resource: HubResource; onOpenTechStack: () => void }) {
  return (
    <details className="hub-card content-card">
      <summary>
        <span className="hub-card__icon"><ResourceIconGraphic icon={resource.icon} /></span>
        <span className="hub-card__heading">
          <small>{resource.category}</small>
          <strong>{resource.title}</strong>
          <span>{resource.summary}</span>
        </span>
        <span className="hub-card__toggle" aria-hidden="true">+</span>
      </summary>
      <div className="hub-card__details">
        <ul>
          {resource.details.map((detail) => <li key={detail}>{detail}</li>)}
        </ul>
        {resource.links && (
          <div className="hub-card__links">
            {resource.links.map((link) => link.action === 'tech-stack' ? (
              <button key={link.label} onClick={onOpenTechStack} type="button">
                {link.label}<span aria-hidden="true">→</span>
              </button>
            ) : link.href?.startsWith('/') ? (
              <Link key={link.href} to={link.href}>{link.label}<span aria-hidden="true">→</span></Link>
            ) : (
              <a href={link.href} key={link.href} rel="noreferrer" target="_blank">{link.label}<span aria-hidden="true">↗</span></a>
            ))}
          </div>
        )}
      </div>
    </details>
  )
}

export function EmployeeHubPage() {
  const employeeId = getSelectedEmployeeId()
  const { employee } = useSelectedEmployee()
  const [query, setQuery] = useState('')
  const [contacts, setContacts] = useState<SupportContact[]>([])
  const [contactsLoading, setContactsLoading] = useState(true)
  const techStackDialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const controller = new AbortController()
    getSupportContacts(controller.signal)
      .then(setContacts)
      .catch(() => setContacts([]))
      .finally(() => setContactsLoading(false))
    return () => controller.abort()
  }, [])

  const resources = useMemo<HubResource[]>(() => {
    const contactResources = contacts.map((contact): HubResource => ({
      id: `contact-${contact.id}`,
      category: resourceHubContent.contactsCategory,
      icon: 'person',
      title: `${contact.firstName} ${contact.lastName}`,
      summary: contact.jobTitle,
      details: [...resourceHubContent.contactDetails[contact.contactType], `Email: ${contact.email}`],
      keywords: [contact.email, contact.contactType, 'contact', 'help', 'support'],
    }))

    return [...contactResources, ...resourceHubContent.resources]
  }, [contacts])

  const filteredResources = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return resources

    return resources.filter((resource) => [
      resource.title,
      resource.category,
      resource.summary,
      ...resource.details,
      ...(resource.keywords ?? []),
    ].join(' ').toLowerCase().includes(normalizedQuery))
  }, [query, resources])

  if (employeeId === null) {
    return <Navigate replace to="/find-profile" />
  }

  return (
    <AppShell currentStep={0} showProgress={false}>
      <main className="page employee-hub page-enter">
        <header className="hub-header">
          <div>
            <p className="eyebrow">{resourceHubContent.eyebrow}</p>
            <h1>{resourceHubContent.title(employee?.firstName)}</h1>
            <p>{resourceHubContent.description}</p>
          </div>
          <Link className="hub-revisit-link" to="/onboarding/welcome">Revisit onboarding <span aria-hidden="true">→</span></Link>
        </header>

        <div className="hub-search">
          <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="m16 16 5 5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          </svg>
          <label className="sr-only" htmlFor="resource-search">{resourceHubContent.searchLabel}</label>
          <input
            id="resource-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder={resourceHubContent.searchPlaceholder}
            type="search"
            value={query}
          />
          {query && <button onClick={() => setQuery('')} type="button">{resourceHubContent.clearSearch}</button>}
        </div>

        {contactsLoading && <p className="hub-loading">{resourceHubContent.contactLoading}</p>}

        {filteredResources.length > 0 ? (
          <div className="hub-grid">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                onOpenTechStack={() => techStackDialog.current?.showModal()}
                resource={resource}
              />
            ))}
          </div>
        ) : (
          <div className="hub-empty">
            <h2>{resourceHubContent.noResultsTitle}</h2>
            <p>{resourceHubContent.noResultsDescription}</p>
          </div>
        )}

        <dialog className="tech-stack-dialog" ref={techStackDialog}>
          <div className="tech-stack-dialog__heading">
            <div>
              <p className="eyebrow">Engineering at Meridian</p>
              <h2>{onboardingContent.role.stackTitle}</h2>
            </div>
            <button aria-label="Close tech stack" onClick={() => techStackDialog.current?.close()} type="button">×</button>
          </div>
          <div className="tech-stack-dialog__grid">
            {onboardingContent.role.stack.map((item) => (
              <article key={item.layer}>
                <small>{item.layer}</small>
                <h3>{item.tools}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </dialog>
      </main>
    </AppShell>
  )
}
