import React, { useContext } from "react";
import { FilterButtonContext } from "../App";
import "./style.css";

const styleButtonClick = {
  color: "#F7F8FD",
  background: "#A4B8ED",
};

function Button({ name, buttonText }) {
  const { filter, setFilter } = useContext(FilterButtonContext);
  return (
    <button
      style={filter === name ? styleButtonClick : {}}
      name={name}
      onClick={() => setFilter(name)}
      className="btn"
    >
      {buttonText}
    </button>
  );
}

export default Button;
