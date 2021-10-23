import React from "react";
import TodoItem from "../TodoItem";
import { useSelector } from "react-redux";
import { getCurrentFilter, getTodos } from "../../redux/selectors";
import { FILTERSTYPE } from "../../constants";

function Todos() {
  let todos = useSelector(getTodos);
  let currentFilter = useSelector(getCurrentFilter);
  let filterData;

  if (currentFilter === FILTERSTYPE.ALL) {
    filterData = todos;
  } else if (currentFilter === FILTERSTYPE.COMPLETED) {
    filterData = todos.filter((todo) => todo.isDone);
  } else {
    filterData = todos.filter((todo) => !todo.isDone);
  }
  return filterData.map((data) => <TodoItem key={data.id} todo={data} />);
}

export default Todos;
