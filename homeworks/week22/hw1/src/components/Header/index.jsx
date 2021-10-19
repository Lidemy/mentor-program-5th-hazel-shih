import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../../context";
import { GetUserContext } from "../../components/App";

const HeaderContainer = styled.header`
  height: 54px;
  padding: 35px 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavBarPartContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(Link)`
  margin: 0;
  font-family: "Open Sans Condensed", sans-serif;
  font-size: 40px;
  font-weight: bold;
  margin-right: 45px;
  color: #222831;
  cursor: pointer;
`;

const NavBarLink = styled(Link)`
  text-decoration: none;
  color: #484e57;
  cursor: pointer;
  font-family: "Noto Sans TC", sans-serif;
  & + & {
    margin-left: 45px;
  }
`;

const isNowPathStyle = {
  borderBottom: "2px solid #f8f18d",
};

function Header() {
  const { user, setUser } = useContext(AuthContext);
  const { isGettingUser } = useContext(GetUserContext);
  const [nowPath, setNowPath] = useState("/");
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setNowPath(location.pathname);
  }, [location]);

  function handleLogout() {
    setUser(null);
    localStorage.setItem("token", "");
    if (nowPath !== "/") {
      history.push("/");
    }
  }

  return (
    <HeaderContainer>
      <NavBarPartContainer>
        <Logo to="/">Hazel's Blog</Logo>
        <NavBarLink
          style={nowPath === "/" ? isNowPathStyle : {}}
          to="/"
          children="首頁"
        />
        <NavBarLink
          style={nowPath === "/about" ? isNowPathStyle : {}}
          to="/about"
          children="關於我"
        />
      </NavBarPartContainer>
      {!isGettingUser && (
        <NavBarPartContainer>
          {!user ? (
            <>
              <NavBarLink
                style={nowPath === "/register" ? isNowPathStyle : {}}
                to="/register"
                children="註冊"
              />
              <NavBarLink
                style={nowPath === "/login" ? isNowPathStyle : {}}
                to="/login"
                children="登入"
              />
            </>
          ) : (
            <>
              <NavBarLink
                style={nowPath === "/list" ? isNowPathStyle : {}}
                to="/list"
                children="管理我的文章"
              />
              <NavBarLink
                style={nowPath === "/write" ? isNowPathStyle : {}}
                to="/write"
                children="發布文章"
              />
              <NavBarLink to="/" onClick={handleLogout} children="登出" />
            </>
          )}
        </NavBarPartContainer>
      )}
    </HeaderContainer>
  );
}

export default Header;
