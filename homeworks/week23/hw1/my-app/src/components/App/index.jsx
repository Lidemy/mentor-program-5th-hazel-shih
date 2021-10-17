import { createContext, useState } from "react";
import styled from "styled-components";
import Todos from "../Todos";
import Input from "../Input";
import Filter from "../Filter";
import useTodos from "../../hooks/useTodos";

const Wrapper = styled.div`
  padding: 50px 30% 50px 30%;
  position: relative;
`;

const Section = styled.section`
  box-sizing: border-box;
  min-height: auto;
  background: #f7f8fd;
  border-radius: 30px;
  padding: 35px 35px 60px 35px;
  position: relative;
  box-shadow: 3px 3px 8px #3459ab84;
`;

const DeleteBtn = styled.button`
  border-style: none;
  background: none;
  font-family: "Roboto", sans-serif;
  color: #a4b8ed;
  font-size: 18px;
  cursor: pointer;
  bottom: 30px;
  position: absolute;
  &:hover {
    color: #3b66c3;
  }
`;

const Title = styled.h1`
  font-family: "Roboto", sans-serif;
  color: #a4b8ed;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 15px;
`;

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
    <Wrapper className="todo-list">
      <Section
        style={{ paddingBottom: todos.length !== 0 ? "60px" : "35px" }}
        className="wrapper"
      >
        <Title className="title">TODO LIST</Title>
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
        <DeleteBtn
          style={todos.length !== 0 ? {} : { display: "none" }}
          onClick={handleDeleteAll}
          className="delete-all"
        >
          Delete All
        </DeleteBtn>
      </Section>
    </Wrapper>
  );
}

export default App;
export { TodoItemFunctionContext };
export { FilterButtonContext };
