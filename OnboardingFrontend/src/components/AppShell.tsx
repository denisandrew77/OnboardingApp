import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { profileSetupContent } from '../content/profileSetup'
import './AppShell.css'

interface AppShellProps {
  children: ReactNode
  currentStep: number
}

export function AppShell({ children, currentStep }: AppShellProps) {
  const { shell } = profileSetupContent

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label={shell.brandAriaLabel}>
          <span className="brand-mark" aria-hidden="true">{shell.brandInitial}</span>
          <span>{shell.brandName}</span>
        </Link>

        <div className="setup-progress" aria-label={shell.progressAriaLabel(currentStep)}>
          <span>{shell.progressName}</span>
          <div className="progress-dots" aria-hidden="true">
            {[1, 2, 3].map((step) => (
              <span
                className={step <= currentStep ? 'progress-dot progress-dot--active' : 'progress-dot'}
                key={step}
              />
            ))}
          </div>
          <span>{currentStep} / 3</span>
        </div>
      </header>

      <div className="page-frame">{children}</div>

      <footer className="site-footer">
        <span>{shell.footerTitle}</span>
        <span>{shell.footerMode}</span>
      </footer>
    </div>
  )
}
