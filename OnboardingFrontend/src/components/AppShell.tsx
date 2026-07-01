import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { profileSetupContent } from '../content/profileSetup'
import './AppShell.css'

interface AppShellProps {
  children: ReactNode
  currentStep: number
  progressLabel?: string
  totalSteps?: number
  showProgress?: boolean
}

export function AppShell({
  children,
  currentStep,
  progressLabel = profileSetupContent.shell.progressName,
  totalSteps = 3,
  showProgress = true,
}: AppShellProps) {
  const { shell } = profileSetupContent

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label={shell.brandAriaLabel}>
          <span className="brand-mark" aria-hidden="true">{shell.brandInitial}</span>
          <span>{shell.brandName}</span>
        </Link>

        {showProgress && (
          <div
            className="setup-progress"
            aria-label={`${progressLabel} step ${currentStep} of ${totalSteps}`}
          >
            <span>{progressLabel}</span>
            <div className="progress-dots" aria-hidden="true">
              {Array.from({ length: totalSteps }, (_, index) => index + 1).map((step) => (
                <span
                  className={step <= currentStep ? 'progress-dot progress-dot--active' : 'progress-dot'}
                  key={step}
                />
              ))}
            </div>
            <span>{currentStep} / {totalSteps}</span>
          </div>
        )}
      </header>

      <div className="page-frame">{children}</div>

      <footer className="site-footer">
        <span>{shell.footerTitle}</span>
        <span>{shell.footerMode}</span>
      </footer>
    </div>
  )
}
