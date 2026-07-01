import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { getEmployeeTeam } from '../../api/employeesApi'
import { OnboardingLayout } from '../../components/OnboardingLayout'
import { onboardingContent } from '../../content/onboarding'
import { useSelectedEmployee } from '../../hooks/useSelectedEmployee'
import type { TeamDetails } from '../../models/team'
import './TeamPage.css'

export function TeamPage() {
  const { team: content } = onboardingContent
  const { employee, employeeId, hasError: employeeError } = useSelectedEmployee()
  const [team, setTeam] = useState<TeamDetails | null>(null)
  const [teamError, setTeamError] = useState(false)

  useEffect(() => {
    if (employeeId === null) {
      return
    }

    const controller = new AbortController()

    getEmployeeTeam(employeeId, controller.signal)
      .then(setTeam)
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setTeamError(true)
        }
      })

    return () => controller.abort()
  }, [employeeId])

  const hasError = employeeError || teamError

  return (
    <OnboardingLayout step="team">
      <section>
        <div className="step-header">
          <p className="eyebrow">{content.eyebrow}</p>
          <h1>{content.title}</h1>
          <p className="step-description">{content.description}</p>
        </div>

        {hasError ? (
          <div className="team-state content-card">
            <h2>{content.unavailableTitle}</h2>
            <p>{content.unavailableDescription}</p>
            <Link className="button button--secondary" to="/find-profile">
              {content.returnAction}
            </Link>
          </div>
        ) : !employee || !team ? (
          <div className="team-state content-card" aria-live="polite">
            <span className="loading-mark" aria-hidden="true" />
            <p>{content.loading}</p>
          </div>
        ) : (
          <div className="org-chart result-enter">
            <p className="org-chart__team-name">{team.department.name} · {team.name}</p>

            <div className="manager-branch">
              <p>{content.managerLabel}</p>
              {employee.manager ? (
                <article className="person-card person-card--manager">
                  <span className="avatar" aria-hidden="true">
                    {employee.manager.firstName[0]}{employee.manager.lastName[0]}
                  </span>
                  <div>
                    <strong>{employee.manager.firstName} {employee.manager.lastName}</strong>
                    <span>{employee.manager.jobTitle}</span>
                    <a href={`mailto:${employee.manager.email}`}>{employee.manager.email}</a>
                  </div>
                </article>
              ) : (
                <p className="manager-pending">Manager details will be confirmed soon.</p>
              )}
            </div>

            <div className="org-connector" aria-hidden="true" />

            <div className="team-branch">
              <p>{content.teamLabel}</p>
              <div className="people-grid">
                {team.members.map((member) => {
                  const isCurrentEmployee = member.id === employee.id

                  return (
                    <article
                      className={isCurrentEmployee ? 'person-card person-card--current' : 'person-card'}
                      key={member.id}
                    >
                      <span className="avatar" aria-hidden="true">
                        {member.firstName[0]}{member.lastName[0]}
                      </span>
                      <div>
                        <strong>
                          {member.firstName} {member.lastName}
                          {isCurrentEmployee && <small>You</small>}
                        </strong>
                        <span>{member.jobTitle}</span>
                        <a href={`mailto:${member.email}`}>{member.email}</a>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </section>
    </OnboardingLayout>
  )
}
