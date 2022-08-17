import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../app/slice/userSlice";
import { Button } from 'react-bootstrap';
import './header.css'

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogoutHandler = () => {
    const confirm = window.confirm("로그아웃 하시겠습니까?");
    if (confirm) {
      dispatch(logoutUser());
      navigate("/login");
    }
  };
  console.log(localStorage.getItem("jwtToken"))
  return (
    <HeaderBar>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <h1 style={{ padding: "0", marginLeft: "3em", display: "inline", color: "black" }}>
          삼조전자
        </h1>
      </Link>
      <div style={{ marginRight: "10em" }}>
        {localStorage.getItem("jwtToken") === null ?
          <div className='button-box'>
            <Link to={"/login"}>
              <Button variant="outline-success">작성하기</Button>
            </Link>
            <Link to={"/login"}>
              <Button variant="outline-success">로그인</Button>
            </Link>
            <Link to={"/join"}>
              <Button variant="outline-success">회원가입</Button>
            </Link>
          </div>
          :
          <div className='button-box'>
            <Link to={"/write"}>
              <Button variant="outline-success">작성하기</Button>
            </Link>
            <Button variant="outline-success" onClick={onLogoutHandler}>로그아웃</Button>
          </div>
        }
      </div>
    </HeaderBar>
  );
};

export default Header;

const HeaderBar = styled.header`
  margin: 0 3em;
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

