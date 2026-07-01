import { OnboardingLayout } from '../../components/OnboardingLayout'
import { onboardingContent } from '../../content/onboarding'
import { useSelectedEmployee } from '../../hooks/useSelectedEmployee'
import './RolePage.css'

export function RolePage() {
  const { role } = onboardingContent
  const { employee, isLoading } = useSelectedEmployee()

  return (
    <OnboardingLayout step="role">
      <section>
        <div className="step-header">
          <p className="eyebrow">{role.eyebrow}</p>
          <h1>{role.title}</h1>
          <p className="step-description">{role.description}</p>
        </div>

        {isLoading && <p className="role-loading">{role.loading}</p>}
        {employee && (
          <div className="role-profile content-card result-enter">
            <div>
              <span>{role.profileLabel}</span>
              <strong>{employee.jobTitle}</strong>
            </div>
            <div>
              <span>Team</span>
              <strong>{employee.team.name}</strong>
            </div>
          </div>
        )}

        <section className="role-section">
          <h2 className="section-title">{role.stackTitle}</h2>
          <div className="stack-grid">
            {role.stack.map((item) => (
              <article className="stack-card content-card" key={item.layer}>
                <span>{item.layer}</span>
                <h3>{item.tools}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="role-section">
          <h2 className="section-title">{role.valuesTitle}</h2>
          <div className="engineering-values">
            {role.values.map((value) => (
              <article key={value.title}>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="workflow-section content-card">
          <div>
            <p className="card-label">{role.workflowTitle}</p>
            <ol>
              {role.workflow.map((item) => <li key={item}>{item}</li>)}
            </ol>
          </div>
          <aside>
            <p className="card-label">Official references</p>
            {role.references.map((reference) => (
              <a href={reference.href} key={reference.href} rel="noreferrer" target="_blank">
                {reference.label}<span aria-hidden="true">↗</span>
              </a>
            ))}
          </aside>
        </section>
      </section>
    </OnboardingLayout>
  )
}
