import { Task } from '../types'

export function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete
}: {
  task: Task
  onToggle: (id: string) => void
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}) {
  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      <input
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <div>
        <div className="task-title">{task.title}</div>
        <div className="muted">
          <span>{task.category}</span>
          {task.dueDate ? <span> • due {new Date(task.dueDate).toLocaleDateString()}</span> : null}
        </div>
        {task.description ? <div className="muted" style={{marginTop: 6}}>{task.description}</div> : null}
      </div>
      <div className="chips">
        <button className="btn secondary" onClick={() => onEdit(task)} aria-label="Edit task">Edit</button>
        <button className="btn danger" onClick={() => onDelete(task.id)} aria-label="Delete task">Delete</button>
      </div>
    </div>
  )
}