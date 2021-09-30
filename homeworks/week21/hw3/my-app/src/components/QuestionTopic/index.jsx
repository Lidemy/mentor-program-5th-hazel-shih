import styled from "styled-components";

const QuestionTopic = styled.h2`
  margin-bottom: 12px;
  font-size: 18px;
  font-family: MicrosoftJhengHei;
  font-weight: normal;
  ${(props) =>
    props.required &&
    `
  :after {
  content: " *";
  color: #e74149;
  font-size: 15px;
  vertical-align: top;
}
  `}
`;

export default QuestionTopic;
