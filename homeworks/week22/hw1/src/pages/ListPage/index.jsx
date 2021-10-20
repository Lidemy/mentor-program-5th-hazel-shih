import React, { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import Post from "../../components/Post";
import SectionTitle from "../../components/SectionTitle";
import SectionWrapper from "../../components/SectionWrapper";
import { getMyPosts } from "../../WebAPI";
import { AuthContext, GetUserContext } from "../../context";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import { nanoid } from "nanoid";
import PagesContainer from "../../Pagination/PagesContainer";
import Page from "../../Pagination/Page";
import Loading from "../../components/Loading/loading";
import Footer from "../../components/Footer";
import { getPreText } from "../../utils";
import { POST_PER_PAGE as perPage } from "../../constants";

const ListPageWrapper = styled(SectionWrapper)`
  padding: 40px 100px;
`;

function ListPage() {
  const { user } = useContext(AuthContext);
  const { isGettingUser } = useContext(GetUserContext);
  const [showPosts, setShowPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const { pageNum } = useParams();
  const { pathname } = useLocation();
  const totalPostCount = useRef(0);
  const history = useHistory();

  useEffect(() => {
    if (!isGettingUser && !user) {
      alert("登入後才能使用管理文章功能喔！");
      history.push("/");
    }
  }, [history, isGettingUser, user]);

  useEffect(() => {
    if (user) {
      getMyPosts(user.id, perPage, pageNum)
        .then((res) => {
          totalPostCount.current = res.headers.get("x-total-count");
          return res.json();
        })
        .then((posts) => {
          console.log(
            posts.map((e) => {
              return { title: e.title, createdAt: e.createdAt };
            })
          );
          setShowPosts(posts);
          setIsLoadingPosts(false);
        });
    }
  }, [pageNum, user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {user && (
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
                  {new Array(Math.ceil(totalPostCount.current / perPage))
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
          <Footer />
        </>
      )}
    </>
  );
}

export default ListPage;
