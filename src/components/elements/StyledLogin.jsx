import styled from "styled-components";

//컬러값 상수
const GREY = "#999";
const RED = "#ED6055";
const GREEN = "#34A853";

//폼 박스 스타일
const StForm = styled.form`
  position: absolute;

  width: 400px;
  padding: 30px;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

//인풋 그룹(라벨, 인풋, 헬퍼)
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

//버튼 그룹
const StButtonGroup = styled.div`
  display: flex;
  margin-top: 20px;

  button {
    width: 50%;
  }
`;

//비밀번호 보이게 하기
const StLock = styled.div`
  position: absolute;
  margin-top: 40px;
  margin-right: 5px;
  right: 0;
  cursor: pointer;
`;

//헬퍼
const StHelper = styled.div`
  margin-top: 5px;
  font-size: 0.75rem;
  color: ${(props) => props.color};
`;

//로그인, 회원가입 이동하는 텍스트
const StAlreadyUser = styled.span`
  display: inline-block;
  margin-top: 15px;
  font-size: 0.8rem;
  color: #999;

  span:hover {
    cursor: pointer;
    text-decoration-line: underline;
  }
`;

export { GREY, RED, GREEN, StForm, StInputGroup, StButtonGroup, StLock, StHelper, StAlreadyUser };