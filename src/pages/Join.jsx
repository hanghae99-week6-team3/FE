import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { server_url } from "../app/slice";
import Layout from "../components/common/Layout";

const Join = () => {
  const navigate = useNavigate();
  //인풋 value 값들을 받을 state의 초기값 설정
  //백엔드에서 서버 url을 받으면 id값은 지워주자. 목서버는 id를 안넘기면 오류가 나서 넣어뒀다.
  const initialState = { id: 0, userId: "", nickname: "", password: "", passwordConfirm: "" };

  //인풋 value 값들을 관리하는 state
  const [joinUser, setJoinUser] = useState(initialState);

  //아이콘 클릭시 비밀번호 보이게 하기
  const [lock, setLock] = useState(true);

  //ID 중복확인 함수
  const checkId = (userId) => {
    const ok = true;
    // const { ok } = await axios.post(`${server_url}/auth`, userId);
    return ok;
  };

  //닉네임 중복확인 함수
  const checkNickname = (nickname) => {
    const ok = true;
    // const { ok } = await axios.post(`${server_url}/auth`, nickname);
    return ok;
  };

  //ID 유효성 검사 함수
  const isId = (value) => {
    const regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{8,16}$/;
    return regExp.test(value);
  };

  //닉네임 유효성 검사 함수
  const isNickname = (value) => {
    const regExp = /^(?=.*[a-zA-Z가-힣])[a-zA-Z가-힣]{2,10}$/;
    return regExp.test(value);
  };

  //비밀번호 유효성 검사 함수
  const isPassword = (value) => {
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;
    return regExp.test(value);
  };

  //입력값을 서버로 전송하는 postUser 함수
  const postUser = async (value) => {
    await axios.post(`${server_url}/join`, value);
  };

  //입력값 변화를 감지하고 state에 업데이트 시켜주는 onChange 함수
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setJoinUser({ ...joinUser, [name]: value });
  };

  //컬러값 상수
  const RED = "#ED6055";
  const GREEN = "#34A853";

  return (
    <Layout>
      <StJoinForm
        onSubmit={(event) => {
          event.preventDefault();
          if (
            isId(joinUser.userId) &&
            isNickname(joinUser.nickname) &&
            isPassword(joinUser.password) &&
            joinUser.password === joinUser.passwordConfirm
          ) {
            postUser(joinUser);
            alert("회원가입을 축하합니다!");
            navigate("/login");
          } else {
            alert("올바른 값을 입력해주세요.");
          }
        }}
      >
        <StInputGroup>
          <label>아이디</label>
          <input type="text" autoFocus name="userId" value={joinUser.userId} onChange={onChangeHandler} />
          {!isId(joinUser.userId) ? (
            <StHelper color={RED}>8~16자의 영문을 포함한 숫자와 일부 특수문자(._-)만 입력 가능합니다.</StHelper>
          ) : !checkId() ? (
            <StHelper color={RED}>중복된 아이디 입니다.</StHelper>
          ) : (
            <StHelper color={GREEN}>사용하실 수 있는 아이디입니다.</StHelper>
          )}
        </StInputGroup>
        <StInputGroup>
          <label>닉네임</label>
          <input type="text" name="nickname" value={joinUser.nickname} onChange={onChangeHandler} />
          {!isNickname(joinUser.nickname) ? (
            <StHelper color={RED}>2~10자의 영문과 한글만 입력 가능합니다.</StHelper>
          ) : !checkNickname() ? (
            <StHelper color={RED}>중복된 닉네임 입니다.</StHelper>
          ) : (
            <StHelper color={GREEN}>사용하실 수 있는 닉네임입니다.</StHelper>
          )}
        </StInputGroup>
        <StInputGroup>
          <label>비밀번호</label>
          <input
            type={lock ? "password" : "text"}
            name="password"
            value={joinUser.password}
            onChange={onChangeHandler}
          />
          <StLock onClick={() => setLock(!lock)}>🔒</StLock>
          {isPassword(joinUser.password) ? (
            <StHelper color={GREEN}>사용하실 수 있는 비밀번호입니다.</StHelper>
          ) : (
            <StHelper color={RED}>
              8~20자, 영문과 숫자를 필수로 포함해야하고 특수문자(!@#$%^&*)도 입력 가능합니다.
            </StHelper>
          )}
        </StInputGroup>
        <StInputGroup>
          <label>비밀번호 재확인</label>
          <input type="password" name="passwordConfirm" value={joinUser.passwordConfirm} onChange={onChangeHandler} />
          {joinUser.password === joinUser.passwordConfirm && joinUser.passwordConfirm.length !== 0 ? (
            <StHelper color={GREEN}>비밀번호가 일치합니다.</StHelper>
          ) : (
            <StHelper color={RED}>비밀번호가 일치하지 않습니다.</StHelper>
          )}
        </StInputGroup>
        <StButtonGroup>
          <button type="submit">회원가입</button>
          <button type="button" onClick={() => navigate("/")}>
            취소
          </button>
        </StButtonGroup>
        <StAlreadyUser>
          이미 회원이신가요? <span onClick={() => navigate("/login")}>로그인하러가기</span>
        </StAlreadyUser>
      </StJoinForm>
    </Layout>
  );
};

const StJoinForm = styled.form`
  position: absolute;

  width: 400px;
  padding: 30px;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StInputGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  label {
    font-weight: 700;
  }

  label,
  input {
    margin-top: 10px;
  }
`;

const StButtonGroup = styled.div`
  display: flex;
  margin-top: 10px;

  button {
    width: 50%;
  }
`;

const StLock = styled.div`
  position: absolute;
  margin-top: 40px;
  margin-right: 5px;
  right: 0;
  cursor: pointer;
`;

const StHelper = styled.div`
  margin-top: 5px;
  font-size: 0.7rem;
  color: ${(props) => props.color};
`;

const StAlreadyUser = styled.span`
  display: inline-block;
  margin-top: 10px;
  font-size: 0.8rem;
  color: #999;

  span:hover {
    cursor: pointer;
    text-decoration-line: underline;
  }
`;

export default Join;
