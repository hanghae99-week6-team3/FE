import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { displayedTime } from "../utils/timeCalculation";

const Cards = ({ card }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state);
  console.log(user);
  return (
    <Card>
      <CardImg onClick={() => navigate(`/product/${card.product.productId}`)}>
        <CardPicture src={card.product.img} />
      </CardImg>
      <CardInfo>
        <CardTitle>{card.product.title}</CardTitle>
        <CardBottom>
          <CardCategory>
            {card.product.category === "노트북" ? (
              <Notebook>노트북</Notebook>
            ) : card.product.category === "키보드" ? (
              <Keyboard>키보드</Keyboard>
            ) : card.product.category === "마우스" ? (
              <Mouse>마우스</Mouse>
            ) : null}
          </CardCategory>
          <CardPrice>
            {card.product.price.toLocaleString("ko-KR")}{" "}
            <span style={{ fontWeight: "bold" }}>&nbsp;원</span>
          </CardPrice>
          <CardComment>💬 {card.product.commentCount}</CardComment>
          <CardLike>{displayedTime(card.product?.createdAt)}</CardLike>
        </CardBottom>
      </CardInfo>
    </Card>
  );
};

const Card = styled.div`
  width: 28em;
  height: 30em;
  /* border: 1px solid #999; */
  box-shadow: 0em 0.1em 0.15em 0.01em;
  margin: 0 0 1.25em 1.25em;

  &:hover {
    transform: scale(1.005);
  }
`;
const CardImg = styled.div`
  width: 21em;
  height: 21em;
  border: none;
  margin: 1em auto 1em auto;
  background-color: #2f2f2f;
`;

const CardInfo = styled.div`
  width: 22em;
  height: 6.4em;
  margin: 0.5em auto;
`;

const CardPicture = styled.img`
  width: 21em;
  height: 21em;
  object-fit: contain;
  border: none;
`;

const CardTitle = styled.div`
  width: 22em;
  height: 3em;
  border-bottom: 0.2em solid #999;
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
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardPrice = styled.div`
  width: 7.5em;
  padding-left: 0.9em;
  height: 3.3em;

  display: flex;
  justify-content: left;
  align-items: center;
`;

const CardLike = styled.div`
  width: 5em;
  height: 3.3em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardComment = styled.div`
  width: 5em;
  height: 3.3em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Notebook = styled.div`
  background-color: #61dafb;
  color: white;
  font-weight: bold;
  width: 4em;
  height: 2em;
  margin: 0.65em 0 0.65em 0em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5em;
`;

const Keyboard = styled.div`
  background-color: orange;
  color: white;
  font-weight: bold;
  width: 4em;
  height: 2em;
  margin: 0.65em 0 0.65em 0em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5em;
`;

const Mouse = styled.div`
  background-color: rgb(144, 66, 175);
  color: white;
  font-weight: bold;
  width: 4em;
  height: 2em;
  margin: 0.65em 0 0.65em 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5em;
`;
export default Cards;
