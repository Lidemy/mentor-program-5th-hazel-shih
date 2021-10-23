import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import SectionWrapper from "../../components/SectionWrapper";
import { editPost, getOnePost } from "../../WebAPI";
import { useHistory, useParams } from "react-router";
import Footer from "../../components/Footer";
import { AuthContext, GetUserContext } from "../../context";
const EditWrapper = styled(SectionWrapper)`
  padding: 80px 300px 150px 300px;
`;

const EditContainer = styled.div`
  border: solid 1px #818285;
  padding: 30px 30px 70px 30px;
  position: relative;
`;

const EditTitle = styled.h1`
  color: #222831;
  font-family: "Noto Sans TC", sans-serif;
  font-weight: bold;
  margin-bottom: 30px;
`;

const EditForm = styled.form``;

const EditInputBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const EditInput = styled.input`
  border: solid 1px #818285;
  padding: 3px;
  height: 30px;
  width: 100%;
`;

const EditTextArea = styled.textarea`
  border: solid 1px #818285;
  padding: 3px;
  min-height: 400px;
  width: 100%;
`;

const EditSubmitBtn = styled.button`
  position: absolute;
  right: 30px;
  bottom: 30px;
  color: #222831;
  font-family: "Noto Sans TC", sans-serif;
  background: white;
  border: solid 1px #818285;
  padding: 5px 25px;
  cursor: pointer;
  &:hover {
    background: #222831;
    color: white;
  }
`;

const AlertMsg = styled.div`
  word-break: break-word;
  font-size: 14px;
  color: darkred;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: right;
`;

export default function EditPage() {
  const [post, setPost] = useState(null);
  const [errMsg, setErrMsg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const { isGettingUser } = useContext(GetUserContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!isGettingUser && !user) {
      alert("登入後才能使用編輯文章功能喔！");
      history.push("/");
    }
  }, [history, isGettingUser, user]);

  useEffect(() => {
    getOnePost(id).then((previousPost) => {
      setPost(previousPost[0]);
    });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    if (post.title === "" || post.body === "") {
      setErrMsg("文章標題或文章內容未填寫，請再檢查一次");
      setIsLoading(false);
      return;
    }
    editPost(id, post.title, post.body).then((data) => {
      if (data.ok === 0) {
        setErrMsg(`發生了一點錯誤：${data.message}`);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      history.push("/list");
    });
  }

  function handleChange(e) {
    errMsg && setErrMsg();
    const { value, name } = e.target;
    if (name === "title") {
      setPost({
        ...post,
        title: value,
      });
      return;
    }
    setPost({
      ...post,
      body: value,
    });
  }

  return (
    <>
      {user && post && (
        <>
          <EditWrapper>
            <EditContainer>
              <EditTitle>編輯文章</EditTitle>
              <EditForm>
                <EditInputBlock>
                  <EditInput
                    defaultValue={post.title}
                    onChange={handleChange}
                    name="title"
                    placeholder="請輸入文章標題"
                  />
                </EditInputBlock>
                <EditInputBlock>
                  <EditTextArea
                    defaultValue={post.body}
                    onChange={handleChange}
                    name="content"
                    placeholder="請輸入文章內容"
                  />
                </EditInputBlock>
              </EditForm>
              {errMsg && <AlertMsg>{errMsg}</AlertMsg>}
              <EditSubmitBtn onClick={handleSubmit}>送出文章</EditSubmitBtn>
            </EditContainer>
          </EditWrapper>
          <Footer />
        </>
      )}
    </>
  );
}
