import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";
import {
  RED,
  GREEN,
  StForm,
  StInputGroup,
  StButtonGroup,
  StLock,
  StHelper,
  StAlreadyUser,
} from "../components/elements/StyledLogin";

const Login = () => {
  const navigate = useNavigate();
  const initialState = { id: 0, userId: "", password: "" };
  const [loginUser, setLoginUser] = useState(initialState);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setLoginUser({ ...loginUser, [name]: value });
  };

  return (
    <Layout>
      <StForm>
        <StInputGroup>
          <label>아이디</label>
          <input type="text" autoFocus name="userId" value={loginUser.userId} onChange={onChangeHandler} />
          {!loginUser.userId ? <StHelper color={RED}>아이디를 입력하세요.</StHelper> : null}
        </StInputGroup>

        <StInputGroup>
          <label>비밀번호</label>
          <input type="password" name="password" value={loginUser.password} onChange={onChangeHandler} />
          {!loginUser.password ? <StHelper color={RED}>비밀번호를 입력하세요.</StHelper> : null}
        </StInputGroup>

        <StButtonGroup>
          <button type="submit">로그인</button>
          <button type="button" onClick={() => navigate("/")}>
            취소
          </button>
        </StButtonGroup>

        <StAlreadyUser>
          아직 회원이 아니신가요? <span onClick={() => navigate("/join")}>회원가입 하러가기</span>
        </StAlreadyUser>
      </StForm>
    </Layout>
  );
};

export default Login;
