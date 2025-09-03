import { useEffect, useMemo, useState } from 'react'
import { Task, Category } from '../types'

export function TaskForm({
  onSubmit,
  initial,
  onCancel
}: {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void
  initial?: Task
  onCancel?: () => void
}) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [category, setCategory] = useState<Category | Exclude<Category, 'All'>>(initial?.category ?? 'Personal')
  const [dueDate, setDueDate] = useState<string | undefined>(initial?.dueDate ?? '')

  const isEditing = Boolean(initial)

  const isValid = useMemo(() => {
    return title.trim().length > 0 && ['Personal','Work','Study','Other'].includes(String(category))
  }, [title, category])

  useEffect(() => {
    // Accessibility: focus the title input when the form opens
    const el = document.getElementById('task-title')
    el?.focus()
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) return
    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      category: (category as Exclude<Category, 'All'>),
      completed: initial?.completed ?? false,
      dueDate: dueDate || undefined
    })
  }

  return (
    <form className="grid" onSubmit={handleSubmit} aria-label={isEditing ? 'Edit task' : 'Add new task'}>
      <div>
        <label htmlFor="task-title">Title *</label>
        <input
          id="task-title"
          className="input"
          placeholder="e.g., Buy groceries"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          aria-invalid={title.trim().length === 0}
        />
      </div>

      <div className="grid two">
        <div>
          <label htmlFor="task-category">Category *</label>
          <select
            id="task-category"
            className="select"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            required
          >
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="task-due">Due date</label>
          <input
            id="task-due"
            className="input"
            type="date"
            value={dueDate ?? ''}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="task-desc">Description</label>
        <textarea
          id="task-desc"
          className="textarea"
          placeholder="Optional notes..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="toolbar" style={{justifyContent:'flex-end'}}>
        {onCancel && (
          <button type="button" className="btn ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button className="btn" disabled={!isValid}>
          {isEditing ? 'Save Changes' : 'Add Task'}
        </button>
      </div>
    </form>
  )
}