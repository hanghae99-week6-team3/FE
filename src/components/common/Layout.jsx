import React from "react";
import styled from "styled-components";

const Layout = (props) => {
  return <StyledLayout>{props.children}</StyledLayout>;
};

const StyledLayout = styled.div`
  position: relative;
  background-color: aliceblue;
  margin: 0 auto;
  width: 60rem;
  height: 100vh;
`;

export default Layout;
