import React from "react";
import styled from "styled-components";

const PostInfoContainer = styled.div`
  display: flex;
  margin-top: 8px;
  color: #222831;
  font-family: "Noto Sans TC", sans-serif;
  font-size: 12px;
  align-items: center;
`;

const PostInfoCategory = styled.div`
  padding: 2px 6px;
  color: white;
  background-color: #222831;
  margin-right: 10px;
  vertical-align: middle;
`;

const PostInfoAuthor = styled.p`
  margin-right: 10px;
  font-weight: bold;
`;

const PostInfoTime = styled.p`
  color: #818285;
`;

function PostInfo({ category, author, createdAt }) {
  return (
    <PostInfoContainer>
      <PostInfoCategory>{category}</PostInfoCategory>
      <PostInfoAuthor>{author}</PostInfoAuthor>
      <PostInfoTime>{createdAt}</PostInfoTime>
    </PostInfoContainer>
  );
}

export default PostInfo;
