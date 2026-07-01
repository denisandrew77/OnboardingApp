import { OnboardingLayout } from '../../components/OnboardingLayout'
import { onboardingContent } from '../../content/onboarding'
import { useSelectedEmployee } from '../../hooks/useSelectedEmployee'
import './OnboardingWelcomePage.css'

export function OnboardingWelcomePage() {
  const { welcome } = onboardingContent
  const { employee } = useSelectedEmployee()

  return (
    <OnboardingLayout step="welcome">
      <section className="onboarding-welcome">
        <div className="step-header">
          <p className="eyebrow">{welcome.eyebrow}</p>
          <h1>{welcome.title(employee?.firstName)}</h1>
          <p className="step-description">{welcome.description}</p>
        </div>

        {employee && (
          <div className="welcome-profile content-card result-enter">
            <span className="avatar avatar--welcome" aria-hidden="true">
              {employee.firstName[0]}{employee.lastName[0]}
            </span>
            <div>
              <span>Your Meridian profile</span>
              <strong>{employee.firstName} {employee.lastName}</strong>
              <p>{employee.jobTitle} · {employee.team.name}</p>
            </div>
          </div>
        )}

        <dl className="welcome-facts">
          {welcome.details.map((detail) => (
            <div key={detail.label}>
              <dt>{detail.label}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>

        <p className="welcome-note">{welcome.note}</p>
      </section>
    </OnboardingLayout>
  )
}
