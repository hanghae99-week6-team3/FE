import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../app/slice/userSlice";
import { Button } from "react-bootstrap";
import "./header.css";
import logo from "../img/logo.png";

const Header = () => {
  const dispatch = useDispatch();
  const onLogoutHandler = () => {
    const confirm = window.confirm("로그아웃 하시겠습니까?");
    if (confirm) {
      dispatch(logoutUser());
      window.location.replace("/login");
    }
  };
  return (
    <HeaderBar>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <img src={logo} style={{ padding: "0", display: "inline", width: "8em" }} />
      </Link>
      <ButtonBox>
        {localStorage.getItem("jwtToken") === null ? (
          <div className="button-box">
            <Link to={"/login"}>
              <StButton variant="outline-success">작성하기</StButton>
            </Link>
            <Link to={"/login"}>
              <StButton variant="outline-success">로그인</StButton>
            </Link>
            <Link to={"/join"}>
              <StButton variant="outline-success">회원가입</StButton>
            </Link>
          </div>
        ) : (
          <div className="button-box">
            <Link to={"/write"}>
              <StButton variant="outline-success">작성하기</StButton>
            </Link>
            <StButton variant="outline-success" onClick={onLogoutHandler}>
              로그아웃
            </StButton>
          </div>
        )}
      </ButtonBox>
    </HeaderBar>
  );
};

export default Header;

const HeaderBar = styled.header`
  margin: 1em 2em 2em 2em;
  padding: 0;
  width: 100%;
  height: 5em;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  font-weight: bold;
`;

const ButtonBox = styled.div`
  padding-right: 3em;
`;

const StButton = styled(Button)`
  border: none;
  font-weight: 800;
`;
