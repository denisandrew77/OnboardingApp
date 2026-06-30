import { Link } from 'react-router'
import { AppShell } from '../components/AppShell'
import { profileSetupContent } from '../content/profileSetup'
import './WelcomePage.css'

export function WelcomePage() {
  const { welcome } = profileSetupContent

  return (
    <AppShell currentStep={1}>
      <main className="page page--welcome page-enter">
        <section className="welcome-copy">
          <p className="eyebrow">{welcome.eyebrow}</p>
          <h1>{welcome.title}</h1>
          <p className="lead">{welcome.description}</p>

          <div className="welcome-actions">
            <Link className="button button--primary" to="/find-profile">
              {welcome.action}
              <span aria-hidden="true">→</span>
            </Link>
            <p className="supporting-note">{welcome.supportingNote}</p>
          </div>
        </section>

        <aside className="journey-card" aria-label={welcome.journeyAriaLabel}>
          <p className="card-label">{welcome.journeyLabel}</p>
          <ol className="journey-list">
            {welcome.journey.map((item) => (
              <li key={item.number}>
                <span>{item.number}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </main>
    </AppShell>
  )
}
