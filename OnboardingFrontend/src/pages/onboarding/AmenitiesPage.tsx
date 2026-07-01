import { OnboardingLayout } from '../../components/OnboardingLayout'
import { OnboardingStepHeader } from '../../components/OnboardingStepHeader'
import { onboardingContent } from '../../content/onboarding'
import './AmenitiesPage.css'

export function AmenitiesPage() {
  const { amenities } = onboardingContent

  return (
    <OnboardingLayout step="amenities">
      <section>
        <OnboardingStepHeader
          description={amenities.description}
          eyebrow={amenities.eyebrow}
          title={amenities.title}
        />

        <div className="amenities-sections">
          {amenities.sections.map((section) => (
            <section key={section.title}>
              <h2 className="section-title">{section.title}</h2>
              <div className="amenities-grid">
                {section.items.map((item) => (
                  <article className="amenity-card content-card" key={item.name}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="amenities-note">
          <p>{amenities.note}</p>
        </aside>
      </section>
    </OnboardingLayout>
  )
}
