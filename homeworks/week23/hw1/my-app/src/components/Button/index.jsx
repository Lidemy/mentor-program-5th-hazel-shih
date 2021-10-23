import styled from "styled-components";
import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentFilter } from "../../redux/selectors";
import { setFilter } from "../../redux/actions";

const ButtonStyle = styled.button`
  border-radius: 5px;
  border: 2px solid #a4b8ed;
  background: #f7f8fd;
  padding: 5px 10px;
  font-family: "Roboto", sans-serif;
  color: #a4b8ed;
  font-size: 15px;
  :hover {
    cursor: pointer;
  }
  & ~ & {
    margin-left: 10px;
  }
`;

const styleButtonClick = {
  color: "#F7F8FD",
  background: "#A4B8ED",
};

function Button({ name, buttonText }) {
  const currentFilter = useSelector(getCurrentFilter);
  const dispatch = useDispatch();

  const handleClick = useCallback(
    (filterType) => dispatch(setFilter(filterType)),
    [dispatch]
  );

  return (
    <ButtonStyle
      style={currentFilter === name ? styleButtonClick : {}}
      name={name}
      onClick={() => handleClick(name)}
    >
      {buttonText}
    </ButtonStyle>
  );
}

export default Button;
