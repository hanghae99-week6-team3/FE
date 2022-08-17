import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";
import { GREY, StForm, StInputGroup, StButtonGroup, StHelper, StNavigate } from "../components/elements/StyledLogin";
import { isId, isPassword } from "../utils/regExpLogin";
import { __postLogin } from "../app/slice/userSlice";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.user);

  console.log(isAuth);

  //입력값들을 받을 state의 초기값 설정
  //백엔드에서 서버 url을 받으면 id값은 지워주자. 목서버는 id를 안넘기면 오류가 나서 넣어뒀다.
  const initialState = { userId: "", password: "" };

  //로그인시 POST 요청에 사용할 값을 관리하는 state
  const [loginUser, setLoginUser] = useState(initialState);

  //입력값 변화를 감지하고 state에 업데이트 시켜주는 onChange 함수
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setLoginUser({ ...loginUser, [name]: value });
  };

  //로그인시 POST요청을 보낼 함수 (유효성 검사를 통해 서버요청 횟수를 조금 줄였다.)
  const postLogin = (event) => {
    event.preventDefault();
    if (!loginUser.userId.trim() && !loginUser.password.trim()) {
      alert("값을 입력해주세요.");
    } else if (!isId(loginUser.userId) || !isPassword(loginUser.password)) {
      alert("올바른 형식이 아닙니다.");
    } else {
      dispatch(__postLogin(loginUser));
    }
  };

  if (isAuth) {
    navigate("/");
  }

  return (
    <>
      <Layout>
        <StForm onSubmit={postLogin}>
          <StInputGroup>
            <FloatingLabel controlId="floatingInput" label="아이디">
              <Form.Control
                type="text"
                autoFocus
                name="userId"
                value={loginUser.userId}
                onChange={onChangeHandler}
                placeholder="아이디"
              />
            </FloatingLabel>
            {!loginUser.userId ? <StHelper color={GREY}>아이디를 입력하세요</StHelper> : null}
          </StInputGroup>

          <StInputGroup>
            <FloatingLabel controlId="floatingPassword" label="비밀번호">
              <Form.Control
                type="password"
                name="password"
                value={loginUser.password}
                onChange={onChangeHandler}
                placeholder="비밀번호"
              />
            </FloatingLabel>
            {!loginUser.password ? <StHelper color={GREY}>비밀번호를 입력하세요</StHelper> : null}
          </StInputGroup>

          <StButtonGroup>
            <Button variant="success" type="submit">
              로그인
            </Button>
          </StButtonGroup>

          <StNavigate>
            아직 회원이 아니신가요? <span onClick={() => navigate("/join")}>회원가입 하러가기</span>
          </StNavigate>
        </StForm>
      </Layout>
    </>
  );
};

export default Login;
