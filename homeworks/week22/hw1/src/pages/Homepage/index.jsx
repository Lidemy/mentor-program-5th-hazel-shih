import React, { useState, useEffect, useRef } from "react";
import Post from "../../components/Post";
import SectionTitle from "../../components/SectionTitle";
import { getPosts } from "../../WebAPI";
import SectionWrapper from "../../components/SectionWrapper";
import PagesContainer from "../../Pagination/PagesContainer";
import Page from "../../Pagination/Page";
import { useParams, Link, useLocation } from "react-router-dom";
import { nanoid } from "nanoid";
import Loading from "../../components/Loading/loading";
import Footer from "../../components/Footer";
import { getPreText } from "../../utils";
import { POST_PER_PAGE as perPage } from "../../constants";

function HomePage() {
  const { pageNum } = useParams();
  const { pathname } = useLocation();
  const [showPosts, setShowPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const totalPostCount = useRef(0);

  useEffect(() => {
    getPosts(perPage, pageNum)
      .then((res) => {
        totalPostCount.current = res.headers.get("x-total-count");
        return res.json();
      })
      .then((posts) => {
        console.log(posts);
        setShowPosts(posts);
        setIsLoadingPosts(false);
      });
  }, [pageNum]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
              {new Array(Math.ceil(totalPostCount.current / perPage))
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
