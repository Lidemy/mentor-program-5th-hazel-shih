import { useState } from "react";

function useEdit(todo) {
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(todo.content);

  function handleCheck() {
    setEditing(false);
  }

  function handleEdit() {
    setEditing((editing) => !editing);
  }

  function handleCancel() {
    setEditing((editing) => !editing);
    setEditContent(todo.content);
  }

  function handleChangeInput(e) {
    const { value } = e.target;
    setEditContent(value);
  }

  function handleFinish(handleEditContent, id, newContent) {
    setEditing((editing) => !editing);
    if (newContent === "") return;
    handleEditContent(id, newContent);
  }

  return {
    editing,
    setEditing,
    editContent,
    setEditContent,
    handleCheck,
    handleEdit,
    handleCancel,
    handleChangeInput,
    handleFinish,
  };
}

export default useEdit;
