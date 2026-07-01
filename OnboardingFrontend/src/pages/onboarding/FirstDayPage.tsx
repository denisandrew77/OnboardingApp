import { OnboardingLayout } from '../../components/OnboardingLayout'
import { onboardingContent } from '../../content/onboarding'
import './FirstDayPage.css'

export function FirstDayPage() {
  const { firstDay } = onboardingContent

  return (
    <OnboardingLayout step="first-day">
      <section>
        <div className="step-header">
          <p className="eyebrow">{firstDay.eyebrow}</p>
          <h1>{firstDay.title}</h1>
          <p className="step-description">{firstDay.description}</p>
        </div>

        <div className="first-day-layout">
          <ol className="day-timeline">
            {firstDay.timeline.map((item) => (
              <li key={item.time}>
                <time>{item.time}</time>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
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
