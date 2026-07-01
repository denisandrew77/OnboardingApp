import { OnboardingLayout } from '../../components/OnboardingLayout'
import { onboardingContent } from '../../content/onboarding'
import './SchedulePage.css'

export function SchedulePage() {
  const { schedule } = onboardingContent

  return (
    <OnboardingLayout step="schedule">
      <section>
        <div className="step-header">
          <p className="eyebrow">{schedule.eyebrow}</p>
          <h1>{schedule.title}</h1>
          <p className="step-description">{schedule.description}</p>
        </div>

        <div className="schedule-grid">
          {schedule.cards.map((card, index) => (
            <article className="schedule-card content-card" key={card.title}>
              <span>0{index + 1}</span>
              <p>{card.title}</p>
              <h2>{card.value}</h2>
              <div aria-hidden="true" />
              <p>{card.description}</p>
            </article>
          ))}
        </div>

        <aside className="schedule-note">
          <div>
            <span aria-hidden="true">i</span>
          </div>
          <div>
            <h2>{schedule.noteTitle}</h2>
            <p>{schedule.note}</p>
          </div>
        </aside>
      </section>
    </OnboardingLayout>
  )
}
