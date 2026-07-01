import { Link } from 'react-router'
import { EmployeeAvatar } from '../../components/EmployeeAvatar'
import { OnboardingLayout } from '../../components/OnboardingLayout'
import { OnboardingStepHeader } from '../../components/OnboardingStepHeader'
import { onboardingContent } from '../../content/onboarding'
import { useEmployeeTeam } from '../../hooks/useEmployeeTeam'
import { useSelectedEmployee } from '../../hooks/useSelectedEmployee'
import './TeamPage.css'

export function TeamPage() {
  const { team: content } = onboardingContent
  const { employee, employeeId, hasError: employeeError } = useSelectedEmployee()
  const { team, hasError: teamError } = useEmployeeTeam(employeeId)

  const hasError = employeeError || teamError

  return (
    <OnboardingLayout step="team">
      <section>
        <OnboardingStepHeader
          description={content.description}
          eyebrow={content.eyebrow}
          title={content.title}
        />

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
                  <EmployeeAvatar
                    firstName={employee.manager.firstName}
                    lastName={employee.manager.lastName}
                  />
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
                      <EmployeeAvatar firstName={member.firstName} lastName={member.lastName} />
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
