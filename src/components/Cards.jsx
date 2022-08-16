import React from "react";
import styled from "styled-components";

const Cards = () => {
  return (
    <Card>
      <CardImg />
      <CardInfo>
        <CardTitle>노트북 팝니다!!</CardTitle>
        <CardBottom>
          <CardCategory>노트북</CardCategory>
          <CardPrice>300000</CardPrice>
          <CardLike>👍 12</CardLike>
          <CardComment>❤ 45</CardComment>
        </CardBottom>
      </CardInfo>
    </Card>
  );
};

const Card = styled.div`
  width: 28em;
  height: 30em;
  border: 1px solid skyblue;
  margin: 0 0 1.25em 1.25em;
`;
const CardImg = styled.div`
  width: 22em;
  height: 22em;
  border: 1px solid green;
  margin: 1em auto 0 auto;
`;

const CardInfo = styled.div`
  width: 22em;
  height: 6.4em;
  border: 1px solid black;
  margin: 0.5em auto;
`;

const CardTitle = styled.div`
  width: 22em;
  height: 3em;
  border: 1px solid red;
  font-weight: bold;
  display: flex;
  text-align: left;
  align-items: center;
  padding-left: 0.85em;
`;

const CardBottom = styled.div`
  width: 22em;
  height: 3.3em;
  display: flex;
  flex-direction: row;
`;

const CardCategory = styled.div`
  width: 4em;
  height: 2em;
  margin: 0.65em 0 0.65em 0.5em;
  border: 1px solid orange;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardPrice = styled.div`
  width: 7.5em;
  padding-left: 0.9em;
  height: 3.3em;
  border: 1px solid black;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const CardLike = styled.div`
  width: 5em;
  height: 3.3em;
  border: 1px solid skyblue;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardComment = styled.div`
  width: 5em;
  height: 3.3em;
  border: 1px solid pink;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default Cards;
