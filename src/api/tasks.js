import { API_BASE_URL } from "../config";

export const fetchTasks = async () => {
  const res = await fetch(`${API_BASE_URL}/tasks`);
  return res.json();
};

export const createTask = async (task) => {
  await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  });
};

export const deleteTask = async (id) => {
  await fetch(`${API_BASE_URL}/tasks`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });
};
