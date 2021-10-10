import React from "react";
import styled from "styled-components";
import QuestionTopic from "../QuestionTopic";

const SmallText = styled.p`
  font-size: 12px;
  margin-top: 5px;
`;

function SelectQuestion({
  required,
  question,
  explain,
  choices,
  name,
  handleValueChange,
  alert,
}) {
  return (
    <div className="form__question__short-answer">
      <QuestionTopic required={required} children={question} />
      {explain && <SmallText children={explain} />}
      {choices.map((choice, index) => {
        return (
          <div key={index} className="select-input">
            <input
              onChange={handleValueChange}
              style={
                alert ? { borderColor: "#e74149" } : { marginRight: "3px" }
              }
              name={name}
              type="radio"
              id={index}
              choice={choice}
              required={required}
            />
            <label choice={choice} htmlFor={index}>
              {choice}
            </label>
          </div>
        );
      })}
    </div>
  );
}

export default SelectQuestion;
