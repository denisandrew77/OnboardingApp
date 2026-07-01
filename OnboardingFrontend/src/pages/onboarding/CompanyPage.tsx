import { OnboardingLayout } from '../../components/OnboardingLayout'
import { OnboardingStepHeader } from '../../components/OnboardingStepHeader'
import { onboardingContent } from '../../content/onboarding'
import './CompanyPage.css'

export function CompanyPage() {
  const { company } = onboardingContent

  return (
    <OnboardingLayout step="company">
      <section>
        <OnboardingStepHeader
          description={company.description}
          eyebrow={company.eyebrow}
          title={company.title}
        />

        <dl className="company-stats">
          {company.stats.map((stat) => (
            <div key={stat.label}>
              {'breakdown' in stat ? (
                <dd className="work-week-breakdown">
                  {stat.breakdown.map((item) => (
                    <span key={item.label}>
                      <strong>{item.value}</strong>
                      <small>{item.label}</small>
                    </span>
                  ))}
                </dd>
              ) : (
                <dd>{stat.value}</dd>
              )}
              <dt>{stat.label}</dt>
            </div>
          ))}
        </dl>

        <div className="company-section">
          <h2 className="section-title">Five departments, one company</h2>
          <div className="department-grid">
            {company.departments.map((department, index) => (
              <article className="department-card content-card" key={department.name}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{department.name}</h3>
                <p>{department.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="company-principles">
          <h2 className="section-title">{company.principleTitle}</h2>
          <ul>
            {company.principles.map((principle) => <li key={principle}>{principle}</li>)}
          </ul>
        </div>
      </section>
    </OnboardingLayout>
  )
}
