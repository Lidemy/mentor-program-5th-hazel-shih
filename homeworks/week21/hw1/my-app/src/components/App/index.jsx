import { createContext, useState } from "react";
import "./style.css";
import Todos from "../Todos";
import Input from "../Input";
import Filter from "../Filter";
import useTodos from "../../hooks/useTodos";

const TodoItemFunctionContext = createContext();
const FilterButtonContext = createContext();
function App() {
  const {
    todos,
    createTask,
    handleDelete,
    handleToggleIsDone,
    handleDeleteAll,
    handleEditContent,
  } = useTodos();

  const [filter, setFilter] = useState("all");

  return (
    <section className="todo-list">
      <div
        style={{ paddingBottom: todos.length !== 0 ? "60px" : "35px" }}
        className="wrapper"
      >
        <h1 className="title">TODO LIST</h1>
        <Input createTask={createTask} />
        <FilterButtonContext.Provider value={{ filter, setFilter }}>
          <Filter show={todos.length !== 0} />
        </FilterButtonContext.Provider>

        <div>
          <TodoItemFunctionContext.Provider
            value={{
              todos,
              handleDelete,
              handleToggleIsDone,
              handleEditContent,
            }}
          >
            <Todos todosData={todos} showData={filter} />
          </TodoItemFunctionContext.Provider>
        </div>
        <button
          style={todos.length !== 0 ? {} : { display: "none" }}
          onClick={handleDeleteAll}
          className="delete-all"
        >
          Delete All
        </button>
      </div>
    </section>
  );
}

export default App;
export { TodoItemFunctionContext };
export { FilterButtonContext };
