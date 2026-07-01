import { OnboardingLayout } from '../../components/OnboardingLayout'
import { OnboardingStepHeader } from '../../components/OnboardingStepHeader'
import { onboardingContent } from '../../content/onboarding'
import { useEmployeeTeam } from '../../hooks/useEmployeeTeam'
import { useSelectedEmployee } from '../../hooks/useSelectedEmployee'
import './FirstDayPage.css'

export function FirstDayPage() {
  const { firstDay } = onboardingContent
  const { employeeId } = useSelectedEmployee()
  const { team } = useEmployeeTeam(employeeId)
  const isEngineering = team?.department.name.toLowerCase() === 'engineering'

  return (
    <OnboardingLayout step="first-day">
      <section>
        <OnboardingStepHeader
          description={firstDay.description}
          eyebrow={firstDay.eyebrow}
          title={firstDay.title}
        />

        <div className="first-day-layout">
          <ol className="day-timeline">
            {firstDay.timeline.map((item) => (
              <li key={item.time}>
                <time>{item.time}</time>
                <div>
                  <h3>{item.title}</h3>
                  <p>
                    {item.description}
                    {'engineeringNote' in item && isEngineering && item.engineeringNote}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <aside className="bring-card content-card">
            <p className="card-label">{firstDay.bringTitle}</p>
            <ul>
              {firstDay.bringItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </aside>
        </div>
      </section>
    </OnboardingLayout>
  )
}
