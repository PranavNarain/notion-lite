import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import Tasks from "../pages/Tasks";
import Header from "../components/Header";
import initialPages from "../data/dummyPages";
import "../styles/app.css";

function Home() {
  /* ---------- PAGES (NOTES) STATE ---------- */
  const [pages, setPages] = useState(() => {
    const saved = localStorage.getItem("pages");
    return saved ? JSON.parse(saved) : initialPages;
  });

  const [activeId, setActiveId] = useState(() => {
    const saved = localStorage.getItem("activePageId");
    return saved || (initialPages[0] && initialPages[0].id);
  });

  /* ---------- TABS STATE ---------- */
  const [activeTab, setActiveTab] = useState("notes"); // notes | tasks

  /* ---------- PERSIST NOTES ---------- */
  useEffect(() => {
    localStorage.setItem("pages", JSON.stringify(pages));
  }, [pages]);

  useEffect(() => {
    if (activeId) {
      localStorage.setItem("activePageId", activeId);
    }
  }, [activeId]);

  const activePage = pages.find((p) => p.id === activeId);

  /* ---------- NOTES ACTIONS ---------- */
  const addPage = () => {
    const newPage = {
      id: Date.now().toString(),
      title: "Untitled",
      content: "",
      updatedAt: new Date().toISOString(),
    };

    setPages((prev) => [newPage, ...prev]);
    setActiveId(newPage.id);
    setActiveTab("notes");
  };

  const deletePage = (id) => {
    const filtered = pages.filter((p) => p.id !== id);
    setPages(filtered);

    if (id === activeId && filtered.length) {
      setActiveId(filtered[0].id);
    }
  };

  const updatePage = (updated) => {
    setPages((prev) =>
      prev.map((p) =>
        p.id === updated.id
          ? { ...updated, updatedAt: new Date().toISOString() }
          : p
      )
    );
  };

  /* ---------- RENDER ---------- */
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
