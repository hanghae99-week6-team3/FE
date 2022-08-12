import styled from "styled-components";

//컬러값 상수
const RED = "#ED6055";
const GREEN = "#34A853";

const StForm = styled.form`
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
  margin-top: 20px;

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
  margin-top: 15px;
  font-size: 0.8rem;
  color: #999;

  span:hover {
    cursor: pointer;
    text-decoration-line: underline;
  }
`;

export { RED, GREEN, StForm, StInputGroup, StButtonGroup, StLock, StHelper, StAlreadyUser };
