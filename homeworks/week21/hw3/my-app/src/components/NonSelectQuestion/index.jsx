import React from "react";
import styled from "styled-components";
import QuestionTopic from "../QuestionTopic";

const SmallText = styled.p`
  font-size: 12px;
  margin-bottom: 12px;
`;

function NonSelectQuestion({
  required,
  question,
  placeholder,
  name,
  explain,
  handleValueChange,
  alert,
  pattern,
}) {
  return (
    <div className="form__question__short-answer">
      <QuestionTopic
        style={explain ? { marginBottom: "3px" } : {}}
        required={required}
        children={question}
      />
      {explain && <SmallText children={explain} />}
      <input
        style={alert ? { border: "solid 1px #e74149" } : {}}
        onChange={handleValueChange}
        className="answer"
        placeholder={placeholder}
        name={name}
        required={required}
        pattern={pattern}
      />
    </div>
  );
}

export default NonSelectQuestion;
