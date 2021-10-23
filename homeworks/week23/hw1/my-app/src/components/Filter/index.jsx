import React from "react";
import Button from "../Button";
import { FILTERSTYPE } from "../../constants";

function Filter({ show }) {
  return (
    <div style={show ? { marginBottom: "20px" } : { display: "none" }}>
      <Button name={FILTERSTYPE.ALL} buttonText="全部" />
      <Button name={FILTERSTYPE.INCOMPLETE} buttonText="未完成" />
      <Button name={FILTERSTYPE.COMPLETED} buttonText="已完成" />
    </div>
  );
}

export default Filter;
