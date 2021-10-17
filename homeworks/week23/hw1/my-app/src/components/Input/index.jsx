import React from "react";
import "./style.css";
import useInput from "../../hooks/useInput";

function Input({ createTask }) {
  const { input, handleInputChange, handleKeyPress } = useInput();
  return (
    <input
      type="text"
      className="create-task"
      onChange={handleInputChange}
      onKeyPress={(e) => {
        handleKeyPress(e, input, createTask);
      }}
      value={input}
      autoFocus
    />
  );
}

export default Input;
