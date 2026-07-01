import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { getEmployee } from '../api/employeesApi'
import { AppShell } from '../components/AppShell'
import { profileSetupContent } from '../content/profileSetup'
import type { EmployeeDetails } from '../models/employee'
import './ConfirmProfilePage.css'

function formatStartDate(value: string) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`))
}

export function ConfirmProfilePage() {
  const { confirmProfile } = profileSetupContent
  const { employeeId: employeeIdParam } = useParams()
  const employeeId = Number(employeeIdParam)
  const [employee, setEmployee] = useState<EmployeeDetails | null>(null)
  const [hasError, setHasError] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const isValidEmployeeId = Number.isInteger(employeeId) && employeeId > 0

  useEffect(() => {
    if (!isValidEmployeeId) {
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
  }, [employeeId, isValidEmployeeId])

  function confirmEmployee() {
    if (!employee) {
      return
    }

    localStorage.setItem('meridian.employeeId', String(employee.id))
    setIsConfirmed(true)
  }

  if (!isValidEmployeeId || hasError) {
    return (
      <AppShell currentStep={3}>
        <main className="page page--centered page-enter">
          <section className="state-panel">
            <p className="eyebrow">{confirmProfile.unavailableEyebrow}</p>
            <h1>{confirmProfile.unavailableTitle}</h1>
            <p>{confirmProfile.unavailableDescription}</p>
            <Link className="button button--secondary" to="/find-profile">
              {confirmProfile.unavailableAction}
            </Link>
          </section>
        </main>
      </AppShell>
    )
  }

  return (
    <AppShell currentStep={3}>
      <main className="page page--centered page-enter">
        {!employee ? (
          <section className="state-panel" aria-live="polite">
            <span className="loading-mark" aria-hidden="true" />
            <p>{confirmProfile.loading}</p>
          </section>
        ) : isConfirmed ? (
          <section className="success-panel result-enter" aria-live="polite">
            <span className="success-mark" aria-hidden="true">✓</span>
            <p className="eyebrow">{confirmProfile.confirmedEyebrow}</p>
            <h1>{confirmProfile.confirmedTitle(employee.firstName)}</h1>
            <p>{confirmProfile.confirmedDescription}</p>
            <div className="next-chapter">
              <span>{confirmProfile.nextLabel}</span>
              <strong>{confirmProfile.nextTitle}</strong>
            </div>
            <Link className="button button--primary success-action" to="/onboarding/welcome">
              {confirmProfile.nextAction}
              <span aria-hidden="true">→</span>
            </Link>
          </section>
        ) : (
          <section className="confirm-panel">
            <Link className="back-link" to="/find-profile">
              <span aria-hidden="true">←</span> {confirmProfile.back}
            </Link>

            <div className="page-heading">
              <p className="eyebrow">{confirmProfile.eyebrow}</p>
              <h1>{confirmProfile.title}</h1>
              <p>{confirmProfile.description}</p>
            </div>

            <article className="employee-card">
              <div className="employee-card__identity">
                <span className="avatar avatar--large" aria-hidden="true">
                  {employee.firstName[0]}{employee.lastName[0]}
                </span>
                <div>
                  <h2>{employee.firstName} {employee.lastName}</h2>
                  <p>{employee.jobTitle}</p>
                </div>
              </div>

              <dl className="detail-list">
                <div>
                  <dt>{confirmProfile.teamLabel}</dt>
                  <dd>{employee.team.name}</dd>
                </div>
                <div>
                  <dt>{confirmProfile.managerLabel}</dt>
                  <dd>
                    {employee.manager
                      ? `${employee.manager.firstName} ${employee.manager.lastName}`
                      : confirmProfile.missingManager}
                  </dd>
                </div>
                <div>
                  <dt>{confirmProfile.startDateLabel}</dt>
                  <dd>{formatStartDate(employee.startDate)}</dd>
                </div>
                <div>
                  <dt>{confirmProfile.emailLabel}</dt>
                  <dd>{employee.email}</dd>
                </div>
              </dl>
            </article>

            <button className="button button--primary button--full" onClick={confirmEmployee} type="button">
              {confirmProfile.action}
              <span aria-hidden="true">→</span>
            </button>
            <p className="privacy-note">
              {confirmProfile.demoNotice}
            </p>
          </section>
        )}
      </main>
    </AppShell>
  )
}
