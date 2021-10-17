import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  DELETE_ALL,
  TOGGLE_TODO,
} from "./actionType";
import { nanoid } from "nanoid";

export function addTodo(content) {
  return {
    type: ADD_TODO,
    payload: {
      id: nanoid(),
      content,
      isDone: false,
    },
  };
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: {
      id,
    },
  };
}

export function editTodo(id, newContent) {
  return {
    type: EDIT_TODO,
    payload: {
      id,
      content: newContent,
    },
  };
}

export function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    payload: {
      id,
    },
  };
}

export function deleteAllTodo() {
  return {
    type: DELETE_ALL,
  };
}
