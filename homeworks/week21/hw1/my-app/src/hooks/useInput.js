import { useState } from "react";

function useInput() {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  function handleKeyPress(e, input, createTask) {
    if (e.key === "Enter") {
      if (input === "") return;
      createTask(input);
      setInput("");
    }
  }
  return {
    input,
    setInput,
    handleInputChange,
    handleKeyPress,
  };
}

export default useInput;
