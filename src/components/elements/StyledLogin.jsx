import styled from "styled-components";

//컬러값 상수
const GREY = "#999";
const RED = "#ED6055";
const GREEN = "#34A853";

//폼 박스 스타일
const StForm = styled.form`
  position: absolute;

  width: 450px;
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

  label,
  input {
  input,
  button {
    margin-top: 10px;
  }
`;

//버튼 그룹
const StButtonGroup = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 2px;

  button {
    width: 100%;
  }
`;

//비밀번호 보이게 하기
const StLock = styled.div`
  position: absolute;
  margin-top: 27px;
  color: ${GREY};
  margin-top: 17px;
  margin-right: 14px;
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
const StNavigate = styled.span`
  display: inline-block;
  width: 100%;
  margin-top: 15px;
  font-size: 0.9rem;
  text-align: center;
  color: #999;
  color: ${GREY};

  span:hover {
    cursor: pointer;
    text-decoration-line: underline;
  }
`;

export { GREY, RED, GREEN, StForm, StInputGroup, StButtonGroup, StLock, StHelper, StNavigate };
