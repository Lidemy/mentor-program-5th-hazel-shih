import styled from "styled-components";
import Todos from "../Todos";
import Input from "../Input";
import Filter from "../Filter";
import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTodos } from "../../redux/selectors";
import { deleteAllTodo } from "../../redux/actions";

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

function App() {
  const todos = useSelector(getTodos);
  const dispatch = useDispatch();

  const handleClick = useCallback(() => dispatch(deleteAllTodo()), [dispatch]);

  return (
    <Wrapper>
      <Section style={{ paddingBottom: todos.length !== 0 ? "60px" : "35px" }}>
        <Title>TODO LIST</Title>
        <Input />
        <Filter show={todos.length !== 0} />
        <Todos />
        <DeleteBtn
          style={todos.length !== 0 ? {} : { display: "none" }}
          onClick={handleClick}
        >
          Delete All
        </DeleteBtn>
      </Section>
    </Wrapper>
  );
}

export default App;
