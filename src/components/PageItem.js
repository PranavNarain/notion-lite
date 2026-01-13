import React from "react";

function PageItem({ page, active, onSelect, onDelete }) {
  return (
    <div
      className={`page-item ${active ? "active" : ""}`}
      onClick={() => onSelect(page.id)}
    >
      <span>{page.title}</span>
      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(page.id);
        }}
      >
        ✕
      </button>
    </div>
  );
}

export default PageItem;
