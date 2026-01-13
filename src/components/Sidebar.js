import React from "react";
import { Trash2, Plus } from "lucide-react";
import "../styles/app.css";

function Sidebar({ pages, activeId, onSelect, onAdd, onDelete }) {
  return (
    <aside className="sidebar">
      <h1 className="sidebar-logo">Notion Lite</h1>

      <div className="sidebar-header">
        <h3>Pages</h3>
        <button className="icon-btn" onClick={onAdd} title="New Page">
          <Plus size={16} />
        </button>
      </div>

      <div className="pages-list">
        {pages.length === 0 && (
          <p className="empty-text">No pages yet</p>
        )}

        {pages.map((page) => (
          <div
            key={page.id}
            className={`page-item ${activeId === page.id ? "active" : ""}`}
            onClick={() => onSelect(page.id)}
          >
            <span className="page-title">
              {page.title || "Untitled"}
            </span>

            <button
              className="icon-btn danger"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(page.id);
              }}
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
