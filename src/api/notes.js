import { API_BASE_URL } from "../config";

export const fetchNotes = async () => {
  const res = await fetch(`${API_BASE_URL}/notes`);
  return res.json();
};

export const createNote = async (note) => {
  await fetch(`${API_BASE_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note)
  });
};
export const deleteNote = async (id) => {
  await fetch(`${API_BASE_URL}/notes`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });
};
