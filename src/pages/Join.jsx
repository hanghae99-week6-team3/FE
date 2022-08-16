import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { server_url } from "../app/slice";
import Layout from "../components/common/Layout";
import {
  GREY,
  RED,
  GREEN,
  StForm,
  StInputGroup,
  StButtonGroup,
  StLock,
  StHelper,
  StNavigate,
} from "../components/elements/StyledLogin";
import { isId, isNickname, isPassword } from "../components/elements/regExpLogin";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Join = () => {
  const navigate = useNavigate();

  //입력값들을 받을 state의 초기값 설정
  //백엔드에서 서버 url을 받으면 id값은 지워주자. 목서버는 id를 안넘기면 오류가 나서 넣어뒀다.
  const initialState = { id: 0, userId: "", nickname: "", password: "", passwordConfirm: "" };

  //입력값들을 관리하는 state
  const [joinUser, setJoinUser] = useState(initialState);

  //아이콘 클릭시 비밀번호 보이게 하기
  const [lock, setLock] = useState(true);

  //ID 중복확인 함수, 유저 ID값으로 POST 요청하여 중복이 아니면 true, 중복이면 false를 반환함
  const checkId = (value) => {
    const ok = true; //url 연결전 테스트 코드
    // const { ok } = await axios.post(`${server_url}/auth`, {key: "userId", value}); //최종에 사용할 코드
    return ok;
  };

  //닉네임 중복확인 함수, 유저 닉네임값으로 POST 요청하여 중복이 아니면 true, 중복이면 false를 반환함
  const checkNickname = (value) => {
    const ok = true; //url 연결전 테스트 코드
    // const { ok } = await axios.post(`${server_url}/auth`, {key: "nickname", value}); //최종에 사용할 코드
    return ok;
  };

  //onSubmit 함수
  const onSubmitHandler = (event) => {
    event.preventDefault();
    //입력값들의 모든 조건(중복, 유효성)이 true가 되어야 회원가입이 가능하다.
    if (
      checkId(joinUser.userId) &&
      checkNickname(joinUser.nickname) &&
      isId(joinUser.userId) &&
      isNickname(joinUser.nickname) &&
      isPassword(joinUser.password) &&
      joinUser.password === joinUser.passwordConfirm
    ) {
      postUser(joinUser);
      alert("회원가입을 축하합니다!");
      navigate("/login");
    } else {
      alert("아이디, 닉네임 및 비밀번호를 다시 확인해주세요");
    }
  };

  //입력값 변화를 감지하고 state에 업데이트 시켜주는 onChange 함수
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setJoinUser({ ...joinUser, [name]: value });
  };

  //입력값을 서버로 전송하는 함수
  const postUser = async (value) => {
    await axios.post(`${server_url}/join`, value);
  };

  return (
    <Layout>
      <StForm onSubmit={onSubmitHandler}>
        <StInputGroup>
          <FloatingLabel controlId="floatingInput" label="아이디">
            <Form.Control
              type="text"
              autoFocus
              name="userId"
              value={joinUser.userId}
              onChange={onChangeHandler}
              placeholder="아이디"
            />
          </FloatingLabel>
          {!isId(joinUser.userId) ? (
            <StHelper color={GREY}>6~12자, 영문을 포함하고 숫자와 일부 특수문자(._-) 입력 가능</StHelper>
          ) : !checkId() ? (
            <StHelper color={RED}>중복된 아이디 입니다</StHelper>
          ) : (
            <StHelper color={GREEN}>사용하실 수 있는 아이디입니다</StHelper>
          )}
        </StInputGroup>

        <StInputGroup>
          <FloatingLabel controlId="floatingInput" label="닉네임">
            <Form.Control
              type="text"
              name="nickname"
              value={joinUser.nickname}
              onChange={onChangeHandler}
              placeholder="닉네임"
            />
          </FloatingLabel>
          {!isNickname(joinUser.nickname) ? (
            <StHelper color={GREY}>2~6자, 영문과 한글 입력 가능</StHelper>
          ) : !checkNickname() ? (
            <StHelper color={RED}>중복된 닉네임 입니다</StHelper>
          ) : (
            <StHelper color={GREEN}>사용하실 수 있는 닉네임입니다</StHelper>
          )}
        </StInputGroup>

        <StInputGroup>
          <FloatingLabel controlId="floatingPassword" label="비밀번호">
            <Form.Control
              type={lock ? "password" : "text"}
              name="password"
              value={joinUser.password}
              onChange={onChangeHandler}
              placeholder="비밀번호"
            />
          </FloatingLabel>
          <StLock onClick={() => setLock(!lock)}>
            <FontAwesomeIcon icon={faEye} />
          </StLock>
          {isPassword(joinUser.password) ? (
            <StHelper color={GREEN}>사용하실 수 있는 비밀번호입니다</StHelper>
          ) : (
            <StHelper color={GREY}>8~20자, 영문과 숫자를 포함하고 일부 특수문자(!@#$%^&*) 입력 가능</StHelper>
          )}
        </StInputGroup>

        <StInputGroup>
          <FloatingLabel controlId="floatingPassword" label="비밀번호 확인">
            <Form.Control
              type="password"
              name="passwordConfirm"
              value={joinUser.passwordConfirm}
              onChange={onChangeHandler}
              placeholder="비밀번호 확인"
            />
          </FloatingLabel>
          {joinUser.passwordConfirm.length === 0 ? (
            <StHelper color={GREY}>비밀번호를 입력해주세요</StHelper>
          ) : joinUser.password === joinUser.passwordConfirm ? (
            <StHelper color={GREEN}>비밀번호가 일치합니다</StHelper>
          ) : (
            <StHelper color={RED}>비밀번호가 일치하지 않습니다</StHelper>
          )}
        </StInputGroup>

        <StButtonGroup>
          <Button variant="success" type="submit">
            회원가입
          </Button>
          <Button variant="outline-success" type="button" onClick={() => navigate("/")}>
            취소
          </Button>
        </StButtonGroup>

        <StNavigate>
          이미 회원이신가요? <span onClick={() => navigate("/login")}>로그인 하러가기</span>
        </StNavigate>
      </StForm>
    </Layout>
  );
};

export default Join;
