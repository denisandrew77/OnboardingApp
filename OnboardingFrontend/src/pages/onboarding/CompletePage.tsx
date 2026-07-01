import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { OnboardingLayout } from '../../components/OnboardingLayout'
import { onboardingContent } from '../../content/onboarding'
import { useSelectedEmployee } from '../../hooks/useSelectedEmployee'
import './CompletePage.css'

export function CompletePage() {
  const { complete } = onboardingContent
  const { employee } = useSelectedEmployee()
  const navigate = useNavigate()
  const [isComplete, setIsComplete] = useState(
    () => localStorage.getItem('meridian.onboardingCompletedAt') !== null,
  )

  function completeOnboarding() {
    localStorage.setItem('meridian.onboardingCompletedAt', new Date().toISOString())
    localStorage.setItem('meridian.onboardingStep', 'complete')
    setIsComplete(true)
    navigate('/employee-hub')
  }

  return (
    <OnboardingLayout step="complete">
      <section className="completion-page">
        <span className="completion-mark" aria-hidden="true">M</span>
        <p className="eyebrow">{complete.eyebrow}</p>
        <h1>{complete.title(employee?.firstName)}</h1>
        <p className="step-description">{complete.description}</p>

        <ul className="completion-recap">
          {complete.recap.map((item) => (
            <li key={item}><span aria-hidden="true">✓</span>{item}</li>
          ))}
        </ul>

        {isComplete ? (
          <div className="completion-success result-enter" aria-live="polite">
            <strong>{complete.completedLabel}</strong>
            <p>{complete.completedMessage}</p>
            <Link className="completion-hub-link" to="/employee-hub">Open employee resource hub</Link>
            <Link to="/onboarding/welcome">{complete.restartAction}</Link>
          </div>
        ) : (
          <button className="button button--primary completion-action" onClick={completeOnboarding} type="button">
            {complete.finishAction}
            <span aria-hidden="true">✓</span>
          </button>
        )}
      </section>
    </OnboardingLayout>
  )
}
