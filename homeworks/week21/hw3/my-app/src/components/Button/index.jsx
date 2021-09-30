import React from "react";

function Button({ buttonText, handleSubmit }) {
  return (
    <input
      onClick={handleSubmit}
      type="submit"
      className="button"
      value={buttonText}
    />
  );
}

export default Button;
