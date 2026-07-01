interface TechStackItem {
  description: string
  layer: string
  tools: string
}

interface TechStackGridProps {
  items: readonly TechStackItem[]
  variant?: 'page' | 'dialog'
}

export function TechStackGrid({ items, variant = 'page' }: TechStackGridProps) {
  if (variant === 'dialog') {
    return (
      <div className="tech-stack-dialog__grid">
        {items.map((item) => (
          <article key={item.layer}>
            <small>{item.layer}</small>
            <h3>{item.tools}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    )
  }

  return (
    <div className="stack-grid">
      {items.map((item) => (
        <article className="stack-card content-card" key={item.layer}>
          <span>{item.layer}</span>
          <h3>{item.tools}</h3>
          <p>{item.description}</p>
        </article>
      ))}
    </div>
  )
}
