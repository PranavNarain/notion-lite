import React, { useEffect, useState } from "react";
import { fetchTasks, createTask, deleteTask } from "../api/tasks";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  /* ---------- LOAD TASKS FROM AWS ---------- */
  useEffect(() => {
  fetchTasks().then((data) => {
    const mapped = Array.isArray(data)
      ? data.map((t) => ({
          id: t.taskId,     // 🔥 map backend → frontend
          text: t.text,
          done: t.done
        }))
      : [];

    setTasks(mapped);
  });
}, []);


  const addTask = async () => {
    if (!text.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      text,
      done: false
    };

    setTasks((prev) => [...prev, newTask]);
    setText("");

    await createTask(newTask);
  };

  const toggle = async (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    setTasks(updated);

    const changed = updated.find((t) => t.id === id);
    await createTask(changed); // upsert
  };

  const remove = async (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    await deleteTask(id);
  };

  return (
    <div className="tasks">
      <h2>Today</h2>

      <div className="task-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New task..."
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
      </div>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggle(t.id)}
            />

            <span className={t.done ? "done" : ""}>
              {t.text}
            </span>

            {t.done && (
              <button className="delete-btn" onClick={() => remove(t.id)}>
                ✕
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
