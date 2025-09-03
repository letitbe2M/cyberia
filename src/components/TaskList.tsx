import { Task } from "../types";
import { TaskItem } from "./TaskItem";

export function TaskList({
  tasks,
  onToggle,
  onEdit,
  onDelete,
}: {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}) {
  if (tasks.length === 0) {
    return (
      <div className="empty">No tasks here yet. Add your first task ✨</div>
    );
  }

  return (
    <div className="grid " style={{ gap: 10 }}>
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
