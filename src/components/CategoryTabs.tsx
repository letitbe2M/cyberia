import { Category } from '../types'

const categories: Category[] = ['All', 'Personal', 'Work', 'Study', 'Other']

export function CategoryTabs({
  value,
  onChange
}: {
  value: Category,
  onChange: (c: Category) => void
}) {
  return (
    <div className="tabs" role="tablist" aria-label="Task categories">
      {categories.map((c) => (
        <button
          key={c}
          role="tab"
          aria-selected={value === c}
          className={`tab ${value === c ? 'active' : ''}`}
          onClick={() => onChange(c)}
        >
          {c}
        </button>
      ))}
    </div>
  )
}