import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";
import { GREY, StForm, StInputGroup, StButtonGroup, StHelper, StAlreadyUser } from "../components/elements/StyledLogin";
import { isId, isPassword } from "../components/elements/regExpLogin";
import { __postLogin } from "../app/slice/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialState = { id: 0, userId: "", password: "" };
  const [loginUser, setLoginUser] = useState(initialState);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setLoginUser({ ...loginUser, [name]: value });
  };

  const postLogin = (event) => {
    event.preventDefault();
    if (!loginUser.userId.trim() && !loginUser.password.trim()) {
      alert("값을 입력해주세요.");
    } else if (!isId(loginUser.userId) || !isPassword(loginUser.password)) {
      alert("올바른 형식이 아닙니다.");
    } else {
      // dispatch(__postLogin(loginUser));
      dispatch(__postLogin());
    }
  };

  console.log(loginUser);

  return (
    <Layout>
      <StForm onSubmit={postLogin}>
        <StInputGroup>
          <label>아이디</label>
          <input type="text" autoFocus name="userId" value={loginUser.userId} onChange={onChangeHandler} />
          {!loginUser.userId ? <StHelper color={GREY}>아이디를 입력하세요.</StHelper> : null}
        </StInputGroup>

        <StInputGroup>
          <label>비밀번호</label>
          <input type="password" name="password" value={loginUser.password} onChange={onChangeHandler} />
          {!loginUser.password ? <StHelper color={GREY}>비밀번호를 입력하세요.</StHelper> : null}
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
