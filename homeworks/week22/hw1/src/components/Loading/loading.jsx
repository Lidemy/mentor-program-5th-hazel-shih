import styled from "styled-components";

const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 10px solid #f3f3f3;
  border-top: 10px solid #8bcdcd;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  animation: spin 0.5s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loading;
