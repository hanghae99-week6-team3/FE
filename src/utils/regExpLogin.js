//ID 유효성 검사 함수
const isId = (value) => {
  const regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{6,12}$/;
  return regExp.test(value);
};

//닉네임 유효성 검사 함수
const isNickname = (value) => {
  const regExp = /^(?=.*[a-zA-Z가-힣])[a-zA-Z가-힣]{2,6}$/;
  return regExp.test(value);
};

//비밀번호 유효성 검사 함수
const isPassword = (value) => {
  const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;
  return regExp.test(value);
};

export { isId, isNickname, isPassword };
