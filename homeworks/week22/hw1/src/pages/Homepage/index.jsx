import React, { useState, useEffect } from "react";
import Post from "../../components/Post";
import SectionTitle from "../../components/SectionTitle";
import { getPosts } from "../../WebAPI";
import SectionWrapper from "../../components/SectionWrapper";
import PagesContainer from "../../Pagination/PagesContainer";
import Page from "../../Pagination/Page";
import { useParams, Link } from "react-router-dom";
import { nanoid } from "nanoid";
import Loading from "../../components/Loading/loading";
import Footer from "../../components/Footer";

function getPreText(body) {
  if (body.length <= 300) return body;
  return body.slice(0, 300);
}

function HomePage() {
  const { pageNum } = useParams();
  const [showPosts, setShowPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const perPage = 5;

  useEffect(() => {
    getPosts().then((posts) => setPosts(posts));
  }, []);

  useEffect(() => {
    getPosts(perPage, pageNum).then((posts) => {
      setShowPosts(posts);
      setIsLoadingPosts(false);
    });
  }, [pageNum]);

  return (
    <>
      <SectionWrapper>
        <SectionTitle title="最新文章" />
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
                  edit={false}
                />
              );
            })}
            <PagesContainer>
              {new Array(Math.ceil(posts.length / perPage))
                .fill(null)
                .map((item, index) => (
                  <Link key={nanoid()} to={`/page/${index + 1}`}>
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
      </SectionWrapper>
      {!isLoadingPosts && <Footer />}
    </>
  );
}

export default HomePage;
