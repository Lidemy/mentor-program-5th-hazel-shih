import { useRef, useState, useEffect } from "react";

function writeTodosIntoLocalStorage(todos) {
  window.localStorage.setItem("todos", JSON.stringify(todos));
}

function useTodos() {
  const id = useRef(1);
  const [todos, setTodos] = useState(() => {
    let todosData = window.localStorage.getItem("todos") || "";
    if (todosData && todosData !== "[]") {
      todosData = JSON.parse(todosData);
      id.current = todosData[0].id + 1;
    } else {
      todosData = [];
    }
    return todosData;
  });

  useEffect(() => {
    writeTodosIntoLocalStorage(todos);
  }, [todos]);

  const createTask = (todo) => {
    setTodos([
      {
        id: id.current,
        content: todo,
        isDone: false,
      },
      ...todos,
    ]);
    id.current++;
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleIsDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  function handleDeleteAll() {
    setTodos([]);
  }

  function handleEditContent(id, newContent) {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          content: newContent,
        };
      })
    );
  }

  return {
    id,
    todos,
    setTodos,
    createTask,
    handleDelete,
    handleToggleIsDone,
    handleDeleteAll,
    handleEditContent,
  };
}

export default useTodos;
