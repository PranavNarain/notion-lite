import React from "react";

function Header({ activeTab, onChange }) {
  return (
    <div className="header">
      <div className="logo">Notion Lite</div>

      <div className="tabs">
        <button
          className={activeTab === "notes" ? "active" : ""}
          onClick={() => onChange("notes")}
        >
          Notes
        </button>

        <button
          className={activeTab === "tasks" ? "active" : ""}
          onClick={() => onChange("tasks")}
        >
          Tasks
        </button>
      </div>
    </div>
  );
}

export default Header;
