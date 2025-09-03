import { useMemo, useState } from "react";
import { Category, Task } from "./types";
import { useLocalStorage } from "./useLocalStorage";
import { CategoryTabs } from "./components/CategoryTabs";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { Modal } from "./components/Modal";

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function App() {
  // Store tasks as a Record (object map) instead of an array for faster updates
  const [tasks, setTasks] = useLocalStorage<Record<string, Task>>(
    "tasks.v2",
    {}
  );
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Task | null>(null);

  // Convert tasks object → array only when needed for rendering
  const tasksArray = useMemo(() => Object.values(tasks), [tasks]);

  // Apply filtering, search and sorting
  const filtered = useMemo(() => {
    return tasksArray
      .filter((t) => (category === "All" ? true : t.category === category))
      .filter((t) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return (
          t.title.toLowerCase().includes(q) ||
          (t.description ?? "").toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        // sort by completion first, then by created date (newest first)
        if (a.completed !== b.completed) return a.completed ? 1 : -1;
        return a.createdAt > b.createdAt ? -1 : 1;
      });
  }, [tasksArray, category, query]);

  // Add new task
  function addTask(data: Omit<Task, "id" | "createdAt">) {
    const id = uid();
    const next: Task = {
      id,
      createdAt: new Date().toISOString(),
      ...data,
    };
    setTasks((prev) => ({ ...prev, [id]: next }));
  }

  // Toggle complete/incomplete
  function toggleTask(id: string) {
    setTasks((prev) => {
      const t = prev[id];
      if (!t) return prev;
      return { ...prev, [id]: { ...t, completed: !t.completed } };
    });
  }

  // Delete a task
  function deleteTask(id: string) {
    setTasks((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  }

  // Start editing
  function startEdit(task: Task) {
    setEditing(task);
  }

  // Save edited task
  function saveEdit(data: Omit<Task, "id" | "createdAt">) {
    if (!editing) return;
    setTasks((prev) => ({
      ...prev,
      [editing.id]: { ...editing, ...data },
    }));
    setEditing(null);
  }

  // Clear all tasks
  function clearAll() {
    if (confirm("This will remove all tasks. Continue?")) {
      setTasks({});
    }
  }

  return (
    <div className="container">
      <header>
        <div>
          <h1>To-Do List Manager</h1>
          <div className="subtitle">
            Organize your tasks by category, track progress, and never miss a
            deadline.
          </div>
        </div>
        <div className="toolbar">
          <input
            className="input"
            placeholder="Search tasks…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search tasks"
          />
          <button className="btn ghost" onClick={clearAll}>
            Clear All
          </button>
        </div>
      </header>

      <div className="card" style={{ marginBottom: 16 }}>
        <CategoryTabs value={category} onChange={setCategory} />
      </div>

      <div className="grid two">
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Add a task</h2>
          <TaskForm onSubmit={addTask} />
        </div>

        <div className="card" style={{ height: "700px", overflowY: "auto" }}>
          <h2 style={{ marginTop: 0 }}>Tasks</h2>
          {/* TaskList can be wrapped with React.memo to avoid rerendering unless tasks change */}
          <TaskList
            tasks={filtered}
            onToggle={toggleTask}
            onEdit={startEdit}
            onDelete={deleteTask}
          />
        </div>
      </div>

      {editing && (
        <Modal open={!!editing} onClose={() => setEditing(null)}>
          <h2 className="font-semibold mb-2">Edit Task</h2>
          <TaskForm
            initial={editing}
            onSubmit={saveEdit}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}
    </div>
  );
}
