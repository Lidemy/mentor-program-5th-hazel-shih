import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Post from "../../components/Post";
import SectionTitle from "../../components/SectionTitle";
import SectionWrapper from "../../components/SectionWrapper";
import { getMyPosts } from "../../WebAPI";
import { AuthContext } from "../../context";
import { Link, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import PagesContainer from "../../Pagination/PagesContainer";
import Page from "../../Pagination/Page";
import Loading from "../../components/Loading/loading";
import Footer from "../../components/Footer";

const ListPageWrapper = styled(SectionWrapper)`
  padding: 40px 100px;
`;

function getPreText(body) {
  if (body.length <= 300) return body;
  return body.slice(0, 300);
}

function ListPage() {
  const { user } = useContext(AuthContext);
  const [showPosts, setShowPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  const perPage = 5;
  const { pageNum } = useParams();

  useEffect(() => {
    if (user) {
      getMyPosts(user.id).then((posts) => setPosts(posts));
      getMyPosts(user.id, perPage).then((posts) => setShowPosts(posts));
      setIsLoadingPosts(false);
    }
  }, [user]);

  useEffect(() => {
    if (pageNum && user) {
      getMyPosts(user.id, perPage, pageNum).then((posts) => {
        setShowPosts(posts);
      });
    }
  }, [pageNum, user]);

  return (
    <>
      <ListPageWrapper>
        <SectionTitle title="我的文章列表" />
        {isLoadingPosts ? (
          <Loading />
        ) : (
          <>
            {showPosts.map((post) => {
              return (
                <Post
                  key={post.id}
                  imgSrc="https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
                  title={post.title}
                  linkPath={post.id}
                  category="單純mur-mur"
                  author={post.userId.toString()}
                  createdAt={new Date(post.createdAt).toLocaleString()}
                  preText={`${getPreText(post.body)} ...`}
                  edit={true}
                />
              );
            })}
            <PagesContainer>
              {new Array(Math.ceil(posts.length / perPage))
                .fill(null)
                .map((item, index) => (
                  <Link key={nanoid()} to={`/list/page/${index + 1}`}>
                    <Page
                      style={
                        Number(pageNum) === index + 1
                          ? { background: "#8bcdcd", color: "white" }
                          : {}
                      }
                      children={index + 1}
                    />
                  </Link>
                ))}
            </PagesContainer>
          </>
        )}
      </ListPageWrapper>
      {!isLoadingPosts && <Footer />}
    </>
  );
}

export default ListPage;
