import React from "react";
import styled from "styled-components";

const SectionTitleContainer = styled.div`
  position: relative;
  margin-bottom: 40px;
`;

const SectionTitleSquare = styled.div`
  display: inline-block;
  padding: 5px 10px;
  background: #222831;
  color: white;
  font-family: "Noto Sans TC", sans-serif;
`;

const SectionTitleLine = styled.div`
  width: 100%;
  height: 1px;
  background: #222831;
  position: absolute;
  bottom: 0;
`;

function SectionTitle({ title }) {
  return (
    <SectionTitleContainer>
      <SectionTitleSquare>{title}</SectionTitleSquare>
      <SectionTitleLine />
    </SectionTitleContainer>
  );
}

export default SectionTitle;
