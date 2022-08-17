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
import { isId, isNickname, isPassword } from "../utils/regExpLogin";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { __checkId, __checkNickname } from "../app/slice/userSlice";

const Join = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.user);

  //입력값들을 받을 state의 초기값 설정
  //백엔드에서 서버 url을 받으면 id값은 지워주자. 목서버는 id를 안넘기면 오류가 나서 넣어뒀다.
  const initialState = { userId: "", nickname: "", password: "", passwordConfirm: "" };

  //입력값들을 관리하는 state
  const [joinUser, setJoinUser] = useState(initialState);

  //아이콘 클릭시 비밀번호 보이게 하기
  const [lock, setLock] = useState(true);

  const onClickIdHandler = () => {
    if (joinUser.userId.trim()) {
      dispatch(__checkId(joinUser.userId));
    } else {
      alert("값을 입력해주세요");
    }
  };

  const onClickNicknameHandler = () => {
    if (joinUser.nickname.trim()) {
      dispatch(__checkNickname(joinUser.nickname));
    } else {
      alert("값을 입력해주세요");
    }
  };

  //onSubmit 함수
  const onSubmitHandler = (event) => {
    event.preventDefault();
    //입력값들의 모든 조건(중복, 유효성)이 true가 되어야 회원가입이 가능하다.
    if (
      data.isIdOk &&
      data.isNicknameOk &&
      isId(joinUser.userId) &&
      isNickname(joinUser.nickname) &&
      isPassword(joinUser.password) &&
      joinUser.password.trim() === joinUser.passwordConfirm.trim()
    ) {
      postUser({ userId: joinUser.userId, nickname: joinUser.nickname, password: joinUser.password });
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
    await axios.post(`${server_url}join`, value);
  };

  return (
    <Layout>
      <StForm onSubmit={onSubmitHandler}>
        <StInputGroup>
          <InputGroup>
            <Form.Control
              type="text"
              autoFocus
              name="userId"
              value={joinUser.userId}
              onChange={onChangeHandler}
              placeholder="아이디"
              aria-describedby="basic-addon2"
            />
            <Button type="button" variant="outline-success" id="button-addon2" onClick={onClickIdHandler}>
              중복확인
            </Button>
          </InputGroup>
          <StHelper color={GREY}>6~12자, 영문을 포함하고 숫자와 일부 특수문자(._-) 입력 가능</StHelper>
          {data.isIdOk === true ? <StHelper color={GREEN}>사용하실 수 있는 아이디입니다</StHelper> : null}
          {data.isIdOk === false ? <StHelper color={RED}>중복된 아이디 입니다</StHelper> : null}
        </StInputGroup>

        <StInputGroup>
          <InputGroup>
            <Form.Control
              type="text"
              name="nickname"
              value={joinUser.nickname}
              onChange={onChangeHandler}
              placeholder="닉네임"
              aria-describedby="basic-addon2"
            />
            <Button type="button" variant="outline-success" id="button-addon2" onClick={onClickNicknameHandler}>
              중복확인
            </Button>
          </InputGroup>
          <StHelper color={GREY}>2~6자, 영문과 한글 입력 가능</StHelper>
          {data.isNicknameOk === true ? <StHelper color={GREEN}>사용하실 수 있는 닉네임입니다</StHelper> : null}
          {data.isNicknameOk === false ? <StHelper color={RED}>중복된 닉네임 입니다</StHelper> : null}
        </StInputGroup>

        <StInputGroup>
          <Form.Control
            type={lock ? "password" : "text"}
            name="password"
            value={joinUser.password}
            onChange={onChangeHandler}
            placeholder="비밀번호"
          />
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
          <Form.Control
            type="password"
            name="passwordConfirm"
            value={joinUser.passwordConfirm}
            onChange={onChangeHandler}
            placeholder="비밀번호 확인"
          />
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
        </StButtonGroup>

        <StNavigate>
          이미 회원이신가요? <span onClick={() => navigate("/login")}>로그인 하러가기</span>
        </StNavigate>
      </StForm>
    </Layout>
  );
};

export default Join;
