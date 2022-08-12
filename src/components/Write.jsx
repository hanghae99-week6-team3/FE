import React, { useRef, useState } from "react";
import styled from "styled-components";

const Comment = () => {
  return (
    <>
      <WriteContainer></WriteContainer>
    </>
  );
};

const WriteContainer = styled.div`
  width: 40em;
  height: 50em;
  border: 1px solid red;
  /* margin: 30em 0 30em 0; */
`;

export default Comment;
