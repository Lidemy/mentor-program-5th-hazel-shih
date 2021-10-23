import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/actions";
import styled from "styled-components";

const InputStyle = styled.input`
  border: 1px solid #93aae9;
  border-radius: 4px;
  height: 50px;
  width: 100%;
  margin-bottom: 25px;
  padding: 0 2%;
  font-size: 16px;
  color: #2b3b54;
`;

function Input() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const handleKeyPress = useCallback(
    (e) => {
      if (input === "") return;
      if (e.key === "Enter") {
        dispatch(addTodo(input));
        setInput("");
      }
    },
    [dispatch, input]
  );

  return (
    <InputStyle
      type="text"
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}
      value={input}
      autoFocus
    />
  );
}

export default Input;
