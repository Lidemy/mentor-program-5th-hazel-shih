import React from "react";
import Button from "../Button";

function Filter({ show }) {
  return (
    <div style={show ? { marginBottom: "20px" } : { display: "none" }}>
      <Button name="all" buttonText="全部" />
      <Button name="unDone" buttonText="未完成" />
      <Button name="isDone" buttonText="已完成" />
    </div>
  );
}

export default Filter;
