import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./style.css";
import { Provider } from "react-redux";
import store from "./redux/store";

function writeTodosIntoLocalStorage(todos) {
  window.localStorage.setItem("todos", JSON.stringify(todos));
}

store.subscribe(() => writeTodosIntoLocalStorage(store.getState().todos));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
