import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./style.css";
import HomePage from "../../pages/Homepage";
import LoginPage from "../../pages/LoginPage";
import AboutPage from "../../pages/AboutPage";
import RegisterPage from "../../pages/RegisterPage";
import ListPage from "../../pages/ListPage";
import PostPage from "../../pages/PostPage";
import WritePage from "../../pages/WritePage";
import Header from "../Header";
import { AuthContext, GetUserContext } from "../../context";
import { getMe } from "../../WebAPI";
import Banner from "../Banner";
import EditPage from "../../pages/EditPage";

function App() {
  const [user, setUser] = useState(null);
  const [isGettingUser, setIsGettingUser] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setIsGettingUser(false);
      return;
    }

    getMe().then((res) => {
      if (res.ok !== 1) {
        localStorage.setItem("token", "");
        setIsGettingUser(false);
        return;
      }
      setUser(res.data);
      setIsGettingUser(false);
    });
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <GetUserContext.Provider value={{ isGettingUser }}>
          <Router basename={process.env.PUBLIC_URL}>
            <Header />
            <Banner />
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/page/:pageNum">
                <HomePage />
              </Route>
              <Route path="/about">
                <AboutPage />
              </Route>
              <Route exact path="/list">
                <ListPage />
              </Route>
              <Route path="/list/page/:pageNum">
                <ListPage />
              </Route>
              <Route path="/Register">
                <RegisterPage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/post/:id">
                <PostPage />
              </Route>
              <Route exact path="/write">
                <WritePage />
              </Route>
              <Route path="/edit/:id">
                <EditPage />
              </Route>
            </Switch>
          </Router>
        </GetUserContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
export { GetUserContext };
