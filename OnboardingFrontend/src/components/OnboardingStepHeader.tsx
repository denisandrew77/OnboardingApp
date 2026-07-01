interface OnboardingStepHeaderProps {
  description: string
  eyebrow: string
  title: string
}

export function OnboardingStepHeader({
  description,
  eyebrow,
  title,
}: OnboardingStepHeaderProps) {
  return (
    <div className="step-header">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="step-description">{description}</p>
    </div>
  )
}
