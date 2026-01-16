import React, { useEffect, useState } from "react";

function Editor({ page, onUpdate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  /* 🔥 Sync editor when page changes */
  useEffect(() => {
    if (page) {
      setTitle(page.title);
      setContent(page.content);
    }
  }, [page]); // IMPORTANT

  if (!page) {
    return <div className="editor empty">Select or create a page</div>;
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    onUpdate({ ...page, title: e.target.value, content });
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    onUpdate({ ...page, title, content: e.target.value });
  };

  return (
    <div className="editor">
      <input
        className="editor-title"
        value={title}
        onChange={handleTitleChange}
        placeholder="Untitled"
      />

      <textarea
        className="editor-content"
        value={content}
        onChange={handleContentChange}
        placeholder="Start typing..."
      />
    </div>
  );
}

export default Editor;
