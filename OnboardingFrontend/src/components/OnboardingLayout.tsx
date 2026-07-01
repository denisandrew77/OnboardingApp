import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Link, Navigate } from 'react-router'
import {
  onboardingContent,
  onboardingRoutes,
  onboardingStepOrder,
} from '../content/onboarding'
import type { OnboardingStepKey } from '../content/onboarding'
import { getSelectedEmployeeId } from '../hooks/useSelectedEmployee'
import { AppShell } from './AppShell'
import './OnboardingLayout.css'

interface OnboardingLayoutProps {
  children: ReactNode
  step: OnboardingStepKey
}

export function OnboardingLayout({ children, step }: OnboardingLayoutProps) {
  const employeeId = getSelectedEmployeeId()
  const stepIndex = onboardingStepOrder.indexOf(step)
  const previousStep = onboardingStepOrder[stepIndex - 1]
  const nextStep = onboardingStepOrder[stepIndex + 1]

  useEffect(() => {
    localStorage.setItem('meridian.onboardingStep', step)
  }, [step])

  if (employeeId === null) {
    return <Navigate replace to="/find-profile" />
  }

  const previousRoute = previousStep
    ? onboardingRoutes[previousStep]
    : `/confirm-profile/${employeeId}`

  return (
    <AppShell
      currentStep={stepIndex + 1}
      progressLabel={onboardingContent.navigation.progressLabel}
      totalSteps={onboardingStepOrder.length}
    >
      <main className="page onboarding-page page-enter">
        <div className="onboarding-content">{children}</div>

        <nav className="onboarding-navigation" aria-label="Onboarding steps">
          <Link className="button button--secondary" to={previousRoute}>
            <span aria-hidden="true">←</span>
            {onboardingContent.navigation.previous}
          </Link>

          {nextStep && (
            <Link className="button button--primary" to={onboardingRoutes[nextStep]}>
              {onboardingContent.navigation.next}
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </nav>
      </main>
    </AppShell>
  )
}
