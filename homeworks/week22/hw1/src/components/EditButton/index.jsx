import React from "react";
import styled from "styled-components";

const Button = styled.button`
  color: #222831;
  font-family: "Noto Sans TC", sans-serif;
  font-weight: bold;
  padding: 6px 0px;
  border: solid 1px #222831;
  font-size: 14px;
  cursor: pointer;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #92c4dc;
  &:hover {
    background: #79a0b7;
  }
`;

function EditButton() {
  return <Button children="編輯文章" />;
}

export default EditButton;
