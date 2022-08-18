import Card from "react-bootstrap/Card";
import styled from "styled-components";

const StImage = styled(Card)`
  /* padding: 20px; */
  display: flex;
  align-items: center;
  height: 50em;

  img {
    cursor: pointer;
    object-fit: cover;
    width: 100%;
    overflow: hidden;
    /* height: 50em; */
  }
`;

const StCard = styled(Card)`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
`;

const StTitleGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StRight = styled.div`
  div:nth-child(1) {
    font-size: 0.9rem;
    color: #999;
  }

  div:nth-child(2) {
    font-size: 1.5rem;
    font-weight: 800;
    margin-top: 10px;
  }

  div:nth-child(3) {
    font-size: 1.8rem;
    font-weight: 800;
    margin-top: 5px;
  }
`;

const StLeft = styled.div`
  display: flex;
  height: 115px;

  div:nth-child(1) {
    font-size: 0.9rem;
    color: #999;
  }
`;

const StBody = styled.div`
  font-weight: 600;
`;

const StFooter = styled.div`
  display: flex;
  color: #999;
  margin-top: 40px;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9rem;

  div:nth-child(2) {
    display: flex;
    gap: 2px;
  }
`;

export { StImage, StCard, StTitleGroup, StRight, StLeft, StBody, StFooter };
