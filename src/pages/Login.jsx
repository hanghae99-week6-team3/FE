import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";
import { GREY, StForm, StInputGroup, StButtonGroup, StHelper, StNavigate } from "../components/elements/StyledLogin";
import { isId, isPassword } from "../components/elements/regExpLogin";
import { __postLogin } from "../app/slice/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //입력값들을 받을 state의 초기값 설정
  //백엔드에서 서버 url을 받으면 id값은 지워주자. 목서버는 id를 안넘기면 오류가 나서 넣어뒀다.
  const initialState = { id: 0, userId: "", password: "" };

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
      // dispatch(__postLogin(loginUser)); //최종에 사용할 코드
      dispatch(__postLogin()); //url 연결전 테스트 코드
      alert("환영합니다!");
    }
  };

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

        <StNavigate>
          아직 회원이 아니신가요? <span onClick={() => navigate("/join")}>회원가입 하러가기</span>
        </StNavigate>
      </StForm>
    </Layout>
  );
};

export default Login;
