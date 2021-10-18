import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  DELETE_ALL,
  TOGGLE_TODO,
} from "../actionType";

let currentId = 0;

const initialState = () => {
  let todosData = window.localStorage.getItem("todos") || "";
  if (todosData && todosData !== "[]") {
    todosData = JSON.parse(todosData);
    currentId = todosData[0].id + 1;
  } else {
    todosData = [];
  }
  return todosData;
};

export default function todosReducer(state = initialState(), action) {
  switch (action.type) {
    case ADD_TODO: {
      const { content } = action.payload;
      return [
        {
          id: ++currentId,
          content,
          isDone: false,
        },
        ...state,
      ];
    }

    case DELETE_TODO: {
      const { id } = action.payload;
      return state.filter((todo) => todo.id !== id);
    }

    case EDIT_TODO: {
      const { id, content } = action.payload;
      return state.map((todo) =>
        todo.id === id ? { ...todo, content: content } : todo
      );
    }

    case TOGGLE_TODO: {
      const { id } = action.payload;
      return state.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      );
    }

    case DELETE_ALL: {
      return [];
    }

    default:
      return state;
  }
}
