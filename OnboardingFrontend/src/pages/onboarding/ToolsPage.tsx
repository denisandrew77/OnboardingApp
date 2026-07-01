import { OnboardingLayout } from '../../components/OnboardingLayout'
import { onboardingContent } from '../../content/onboarding'
import './ToolsPage.css'

export function ToolsPage() {
  const { tools } = onboardingContent

  return (
    <OnboardingLayout step="tools">
      <section>
        <div className="step-header">
          <p className="eyebrow">{tools.eyebrow}</p>
          <h1>{tools.title}</h1>
          <p className="step-description">{tools.description}</p>
        </div>

        <div className="tools-grid">
          {tools.tools.map((tool) => (
            <article className="tool-card content-card" key={tool.name}>
              <div className="tool-card__heading">
                <span className="tool-mark" aria-hidden="true">{tool.name[0]}</span>
                <div>
                  <h2>{tool.name}</h2>
                  <p>{tool.purpose}</p>
                </div>
              </div>
              <p className="tool-description">{tool.description}</p>
              <ul>
                {tool.practices.map((practice) => <li key={practice}>{practice}</li>)}
              </ul>
              <a href={tool.href} rel="noreferrer" target="_blank">
                Open {tool.name}<span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>

        <aside className="focus-note">
          <p className="card-label">{tools.boundaryTitle}</p>
          <p>{tools.boundary}</p>
        </aside>
      </section>
    </OnboardingLayout>
  )
}
