# To‑Do List Manager (React + TypeScript)

This project fulfills the **Web Application: To‑Do List Manager** scenario from the hiring task.
It implements:
- A homepage to view tasks by categories (All, Personal, Work, Study, Other)
- Add, edit, delete tasks
- Mark complete/incomplete
- **LocalStorage** persistence across sessions
- Basic validation & accessibility
- Clean, modular structure and modern UI

## Tech
- React 18 + TypeScript
- Vite build tool
- No external UI libs (pure CSS), so it runs anywhere quickly

## Run locally
```bash
npm install
npm run dev
```
Then open the URL printed in your terminal (usually http://localhost:5173).

## Build preview
```bash
npm run build
npm run preview
```

## Project structure
```text
src/
  components/
    CategoryTabs.tsx
    TaskForm.tsx
    TaskItem.tsx
    TaskList.tsx
  App.tsx
  main.tsx
  styles.css
  types.ts
  useLocalStorage.ts
```

## Notes
- Data is stored under the key `tasks.v1` in `localStorage`.
- Edge cases handled: empty title/category, safe parsing of localStorage, confirmation on destructive "Clear All".
- Sorting: active tasks first, then by most recent.# cyberia
