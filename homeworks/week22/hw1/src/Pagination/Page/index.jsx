import styled from "styled-components";

const Page = styled.div`
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  color: #222831;
  padding: 10px;
  cursor: pointer;
  &:hover {
    color: #8bcdcd;
    border: 1px solid #8bcdcd;
  }
`;

export default Page;
