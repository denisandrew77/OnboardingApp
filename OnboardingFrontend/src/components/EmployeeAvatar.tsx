interface EmployeeAvatarProps {
  className?: string
  firstName: string
  lastName: string
}

export function EmployeeAvatar({
  className = 'avatar',
  firstName,
  lastName,
}: EmployeeAvatarProps) {
  return (
    <span className={className} aria-hidden="true">
      {firstName[0]}{lastName[0]}
    </span>
  )
}
