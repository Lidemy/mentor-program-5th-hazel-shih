import React, { useState, useCallback } from "react";
import styled from "styled-components";
import deleteIMG from "../../img/delete.png";
import checkedIMG from "../../img/checked.png";
import editIMG from "../../img/edit.png";
import checkIMG from "../../img/check.png";
import cancelIMG from "../../img/close.png";
import { useDispatch } from "react-redux";
import { toggleTodo, editTodo, deleteTodo } from "../../redux/actions";

const TaskBlock = styled.div`
  width: 100%;
  min-height: 50px;
  padding: 0 3%;
  border-radius: 10px;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  margin-bottom: 20px;

  &:hover {
    background: #dde6fa;
    transition: background 0.2s;
  }

  ${(props) =>
    props.isDone &&
    `
    filter: opacity(25%);
  `}
`;

const CheckBox = styled.div`
  min-width: 18px;
  min-height: 18px;
  border: 1px solid #3b66c3;
  border-radius: 1px;
  cursor: pointer;
  margin-right: 20px;

  &:hover {
    box-shadow: 0 0 2px 1px #3b66c3;
  }

  ${(props) =>
    props.isDone &&
    `
    background-image: url(${checkedIMG});
    background-size: contain;
  `}
`;

const Content = styled.div`
  width: 100%;
  color: #2b3b54;
  font-size: 16px;
  text-align: left;
  overflow-wrap: anywhere;
  display: ${(props) => (props.editing ? "none" : "block")};
`;

const Delete = styled.div`
  min-width: 22px;
  min-height: 22px;
  background-image: url(${deleteIMG});
  filter: opacity(40%);
  background-size: cover;
  cursor: pointer;
  margin-left: 15px;

  &:hover {
    filter: none;
  }
`;

const Edit = styled(Delete)`
  ${(props) =>
    props.editing ? `display: none` : `background-image:url(${editIMG})`}
`;

const Finish = styled(Delete)`
  ${(props) =>
    props.editing ? `background-image:url(${checkIMG})` : `display: none`}
`;

const Cancel = styled(Delete)`
  ${(props) =>
    props.editing ? `background-image:url(${cancelIMG})` : `display: none`}
`;

const EditInput = styled.input`
  border: 1px solid #93aae9;
  border-radius: 4px;
  height: 30px;
  width: 100%;
  padding: 0 2%;
  font-size: 16px;
  color: #2b3b54;
  display: ${(props) => (props.editing ? "block" : "none")};
`;

function TodoItem({ todo }) {
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(todo.content);
  const dispatch = useDispatch();

  const handleToggleIsDone = useCallback(
    (id) => dispatch(toggleTodo(id)),
    [dispatch]
  );

  function handleEdit() {
    setEditing((editing) => !editing);
  }

  function handleCancel() {
    setEditing((editing) => !editing);
    setEditContent(todo.content);
  }

  function handleChangeInput(e) {
    const { value } = e.target;
    setEditContent(value);
  }

  const handleFinish = useCallback(
    (id, newContent) => {
      setEditing((editing) => !editing);
      if (newContent === "") return;
      dispatch(editTodo(id, newContent));
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    (id) => dispatch(deleteTodo(id)),
    [dispatch]
  );

  return (
    <TaskBlock isDone={todo.isDone}>
      <CheckBox
        isDone={todo.isDone}
        onClick={() => {
          handleToggleIsDone(todo.id);
        }}
      />
      <Content editing={editing}>{todo.content}</Content>
      <EditInput
        value={editContent}
        editing={editing}
        onChange={handleChangeInput}
      />
      <Finish
        onClick={() => handleFinish(todo.id, editContent)}
        editing={editing}
      />
      <Cancel onClick={handleCancel} editing={editing} />
      <Edit onClick={handleEdit} editing={editing} />
      <Delete onClick={() => handleDelete(todo.id)} />
    </TaskBlock>
  );
}

export default TodoItem;
