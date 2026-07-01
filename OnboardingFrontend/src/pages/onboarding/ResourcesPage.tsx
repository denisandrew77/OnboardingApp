import { OnboardingLayout } from '../../components/OnboardingLayout'
import { onboardingContent } from '../../content/onboarding'
import './ResourcesPage.css'

export function ResourcesPage() {
  const { resources } = onboardingContent

  return (
    <OnboardingLayout step="resources">
      <section>
        <div className="step-header">
          <p className="eyebrow">{resources.eyebrow}</p>
          <h1>{resources.title}</h1>
          <p className="step-description">{resources.description}</p>
        </div>

        <div className="resource-groups">
          {resources.groups.map((group) => (
            <section key={group.title}>
              <h2 className="section-title">{group.title}</h2>
              <div className="resource-list content-card">
                {group.items.map((item) => (
                  <article key={item.name}>
                    <span aria-hidden="true">→</span>
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <blockquote>{resources.reminder}</blockquote>
      </section>
    </OnboardingLayout>
  )
}
