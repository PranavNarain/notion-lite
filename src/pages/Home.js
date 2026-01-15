import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import Tasks from "../pages/Tasks";
import Header from "../components/Header";
import { fetchNotes, createNote } from "../api/notes";
import "../styles/app.css";
import { deleteNote } from "../api/notes"; 

function Home() {
  const [pages, setPages] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [activeTab, setActiveTab] = useState("notes");

  /* ---------- LOAD NOTES FROM AWS ---------- */
  useEffect(() => {
  fetchNotes().then((data) => {
    const notes = Array.isArray(data)
      ? data.map((n) => ({
          id: n.pageId,        // 🔥 map backend → frontend
          title: n.title,
          content: n.content,
          updatedAt: n.updatedAt
        }))
      : [];

    setPages(notes);
    if (notes.length > 0) setActiveId(notes[0].id);
  });
}, []);


  const activePage = pages.find((p) => p.id === activeId);

  /* ---------- NOTES ACTIONS ---------- */

  const addPage = async () => {
    const newPage = {
      id: Date.now().toString(),
      title: "Untitled",
      content: "",
      updatedAt: new Date().toISOString()
    };

    setPages((prev) => [newPage, ...prev]);
    setActiveId(newPage.id);
    setActiveTab("notes");

    await createNote(newPage);
  };

 const deletePage = async (id) => {
  const filtered = pages.filter((p) => p.id !== id);
  setPages(filtered);

  if (id === activeId && filtered.length) {
    setActiveId(filtered[0].id);
  }

  await deleteNote(id);
};

  const updatePage = async (updated) => {
    setPages((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );

    await createNote(updated); // upsert
  };

  return (
    <div className="app">
      <Sidebar
        pages={pages}
        activeId={activeId}
        onSelect={setActiveId}
        onAdd={addPage}
        onDelete={deletePage}
      />

      <div className="main">
        <Header activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === "notes" ? (
          <Editor page={activePage} onUpdate={updatePage} />
        ) : (
          <Tasks />
        )}
      </div>
    </div>
  );
}

export default Home;
