import React, { useState } from "react";
import styled from "styled-components";
import NonSelectQuestion from "../NonSelectQuestion";
import Button from "../Button";
import questions from "../../questions";
import SelectQuestion from "../SelectQuestion";
import RequiredAlert from "../RequiredAlert";
import Footer from "../Footer";

const SmallText = styled.p`
  font-size: 12px;
`;

function App() {
  const [answers, setAnswers] = useState(questions);

  function handleSubmit() {
    setAnswers(
      answers.map((answer) => {
        if (answer.required && answer.content === "") {
          return {
            ...answer,
            alert: true,
          };
        } else {
          return {
            ...answer,
            alert: false,
          };
        }
      })
    );
  }

  function handleValueChange(e) {
    const { value, name } = e.target;
    setAnswers(
      answers.map((answer) => {
        if (answer.name !== name) return answer;
        return {
          ...answer,
          alert: value === "",
          content:
            answer.type === "radio" ? e.target.getAttribute("choice") : value,
        };
      })
    );
  }

  return (
    <div>
      <div className="big-wrapper">
        <div className="yellow-bar"></div>
        <div className="wrapper">
          <section className="form__info">
            <h1 className="form__info__title">新拖延運動報名表單</h1>
            <div className="form__info__date-time">
              <SmallText children="活動日期：2020/12/10 ~ 2020/12/11" />
              <SmallText children="活動地點：台北市大安區新生南路二段1號" />
            </div>
            <div className="form__info__must-write">* 必填</div>
          </section>
          <form className="form__question">
            {answers.map((answer) => {
              if (answer.type === "radio") {
                return (
                  <div key={answer.name}>
                    <SelectQuestion
                      name={answer.name}
                      required={answer.required}
                      question={answer.question}
                      explain={answer.explain}
                      choices={answer.choices}
                      handleValueChange={handleValueChange}
                    />
                    {answer.alert ? <RequiredAlert /> : null}
                  </div>
                );
              }
              return (
                <div key={answer.name}>
                  <NonSelectQuestion
                    required={answer.required}
                    question={answer.question}
                    placeholder={answer.placeholder}
                    name={answer.name}
                    handleValueChange={handleValueChange}
                    explain={answer.explain}
                    pattern={answer.pattern}
                  />
                  {answer.alert ? <RequiredAlert /> : null}
                </div>
              );
            })}
            <Button handleSubmit={handleSubmit} children="提交" />
            <SmallText children="請勿透過表單送出您的密碼。" />
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
