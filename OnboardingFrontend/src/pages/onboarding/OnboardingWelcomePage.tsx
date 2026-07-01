import { EmployeeAvatar } from '../../components/EmployeeAvatar'
import { OnboardingLayout } from '../../components/OnboardingLayout'
import { OnboardingStepHeader } from '../../components/OnboardingStepHeader'
import { onboardingContent } from '../../content/onboarding'
import { useSelectedEmployee } from '../../hooks/useSelectedEmployee'
import './OnboardingWelcomePage.css'

export function OnboardingWelcomePage() {
  const { welcome } = onboardingContent
  const { employee } = useSelectedEmployee()

  return (
    <OnboardingLayout step="welcome">
      <section className="onboarding-welcome">
        <OnboardingStepHeader
          description={welcome.description}
          eyebrow={welcome.eyebrow}
          title={welcome.title()}
        />

        {employee && (
          <div className="welcome-profile content-card result-enter">
            <EmployeeAvatar
              className="avatar avatar--welcome"
              firstName={employee.firstName}
              lastName={employee.lastName}
            />
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
