import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ReadMoreButton from "../ReadMoreButton";
import { Link } from "react-router-dom";
import PostInfo from "../PostInfo";
import PostTitle from "../PostTitle";
import EditButton from "../EditButton";

const PostContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  margin-top: 50px;
  height: auto;
`;

const PostImgContainer = styled.div`
  max-width: 350px;
  height: auto;
`;

const PostImg = styled.img`
  width: 100%;
  height: auto;
`;

const PostPartContainer = styled.div`
  width: 60%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const PostContent = styled.div`
  color: #818285;
  margin-top: 9px;
  font-family: "Noto Sans TC", sans-serif;
  font-weight: lighter;
  font-size: 16px;
  line-height: 24px;
  overflow: hidden;
  height: auto;
  margin-bottom: 15px;
  word-break: break-all;
`;

function Post({
  imgSrc,
  title,
  category,
  author,
  createdAt,
  preText,
  linkPath,
  edit,
}) {
  return (
    <PostContainer>
      <PostImgContainer>
        <PostImg src={imgSrc} />
      </PostImgContainer>
      <PostPartContainer>
        <PostTitle as={Link} to={`/post/${linkPath}`} children={title} />
        <PostInfo category={category} author={author} createdAt={createdAt} />
        <PostContent children={preText} />
        {edit ? (
          <Link to={`/edit/${linkPath}`}>
            <EditButton />
          </Link>
        ) : (
          <Link to={`/post/${linkPath}`}>
            <ReadMoreButton />
          </Link>
        )}
      </PostPartContainer>
    </PostContainer>
  );
}

Post.propTypes = {
  imgSrc: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
  author: PropTypes.string,
  createdAt: PropTypes.string,
  content: PropTypes.string,
  edit: PropTypes.bool,
};

export default Post;
