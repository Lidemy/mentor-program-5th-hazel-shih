import React from "react";
import styled from "styled-components";
import SectionWrapper from "../../components/SectionWrapper";
import SectionTitle from "../../components/SectionTitle";
import hazel from "../../img/hazel.jpg";
import Footer from "../../components/Footer";

const AboutMeWrapper = styled(SectionWrapper)`
  height: 100%;
`;

const AboutMeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: url(${hazel}) no-repeat center / 200px;
  margin-right: 40px;
`;

const TalkBubble = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  border: 1px solid #222831;
  width: 60%;
  border-radius: 50px;
  color: #222831;
  font-family: "Noto Sans TC", sans-serif;
  font-weight: bold;
  font-size: 30px;
  padding: 30px;
`;

export default function AboutPage() {
  return (
    <>
      <AboutMeWrapper>
        <SectionTitle title="關於我" />
        <AboutMeContainer>
          <Avatar imgUrl={hazel} />
          <TalkBubble>
            哈囉我是 Hazel！
            <br />
            恭喜你已被好運小鵝拜訪～
            <br />
            接下來的幾天內會有好事降臨呦 ✧*｡٩(ˊᗜˋ*)و✧*｡
          </TalkBubble>
        </AboutMeContainer>
      </AboutMeWrapper>
      <Footer />
    </>
  );
}
