import React, { useEffect, useState } from "react";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  /* Load tasks */
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  /* Save tasks */
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!text.trim()) return;

    setTasks([
      ...tasks,
      { id: Date.now(), text, done: false },
    ]);
    setText("");
  };

  const toggle = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const remove = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
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
              <button
                className="delete-btn"
                onClick={() => remove(t.id)}
              >
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
