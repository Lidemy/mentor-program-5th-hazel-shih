import { addTodo } from "../actions";
import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  DELETE_ALL,
  TOGGLE_TODO,
} from "../actionType";

// function writeTodosIntoLocalStorage(todos) {
//   window.localStorage.setItem("todos", JSON.stringify(todos));
// }

const initialState = () => {
  let todosData = window.localStorage.getItem("todos") || "";
  if (todosData && todosData !== "[]") {
    todosData = JSON.parse(todosData);
  } else {
    todosData = [];
  }
  return todosData;
};

export default function todosReducer(state = initialState(), action) {
  switch (action.type) {
    case ADD_TODO: {
      const { content } = action.payload;
      return [...state, addTodo(content)];
    }

    case DELETE_TODO: {
      const { id } = action.payload;
      return state.filter((todo) => todo.id !== id);
    }

    case EDIT_TODO: {
      const { id, content } = action.payload;
      return state.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          content: content,
        };
      });
    }

    case TOGGLE_TODO: {
      const { id } = action.payload;
      return state.map((todo) => {
        return todo.id === id ? { ...todo, isDone: !todo.isDone } : todo;
      });
    }

    case DELETE_ALL: {
      return [];
    }

    default:
      return state;
  }
}
