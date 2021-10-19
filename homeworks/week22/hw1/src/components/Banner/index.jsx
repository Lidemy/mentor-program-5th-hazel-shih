import React from "react";
import styled from "styled-components";

const BannerContainer = styled.div`
  width: 100%;
  height: 150px;
  background: linear-gradient(35deg, #f8f18d, #e1f5c4);
  position: relative;
`;

const BannerInfoContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const BannerTitle = styled.h1`
  font-family: "Noto Sans TC", sans-serif;
  font-size: 25px;
  color: #222831;
`;

const BannerSubTitle = styled.p`
  color: #222831;
  margin-top: 10px;
`;

function Banner() {
  return (
    <BannerContainer>
      <BannerInfoContainer>
        <BannerTitle children="純粹靠北之地" />
        <BannerSubTitle children="WELCOME TO MY BLOG" />
      </BannerInfoContainer>
    </BannerContainer>
  );
}

export default Banner;
