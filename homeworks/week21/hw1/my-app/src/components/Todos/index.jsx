import React from "react";
import TodoItem from "../TodoItem";

function Todos({ showData, todosData }) {
  var filterData;
  if (showData === "all") {
    filterData = todosData;
  } else if (showData === "isDone") {
    filterData = todosData.filter((todo) => todo.isDone);
  } else {
    filterData = todosData.filter((todo) => !todo.isDone);
  }
  return filterData.map((data) => <TodoItem key={data.id} todo={data} />);
}

export default Todos;
