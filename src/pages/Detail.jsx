import React, { useEffect, useState } from "react";
import CommentList from "../components/CommentList";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __getDetail } from "../app/slice/detailSlice";
import Card from "react-bootstrap/Card";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faUser, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { user } = useSelector((state) => state.user);
  // const { data } = useSelector((state) => state.detail);

  const initialState = {
    postId: 1,
    title: "",
    category: "",
    location: "",
    price: 0,
    content: "",
  };

  const [updateProduct, setUpdateProduct] = useState(initialState);
  const [editMode, setEditMode] = useState(false);

  // console.log(updateProduct);

  useEffect(() => {
    dispatch(__getDetail(productId));
  }, [dispatch, productId]);

  const onUpdateHandler = () => {
    setUpdateProduct({
      postId: 1,
      title: "테스트",
      category: "노트북",
      location: "봉천역",
      price: 30000,
      content: "싸게팔아요",
    });
    // setUpdateProduct(data.product);
    setEditMode(true);
  };

  const onSaveHandler = () => {
    if (!updateProduct.title || !updateProduct.location || !updateProduct.price || !updateProduct.content) {
      alert("내용이 비어있습니다.");
    } else {
      dispatch();
      setEditMode(false);
    }
  };

  const onChangeHnadler = (event) => {
    const { name, value } = event.target;
    setUpdateProduct({ ...updateProduct, [name]: value });
  };

  return (
    <>
      <Header></Header>
      <Layout>
        <div>
          <img
            width="540"
            src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp-spacegray-select-202206_GEO_KR?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1654014007858"
          />
        </div>

        {editMode ? (
          <>
            <StCard>
              <StTitleGroup>
                <StRight>
                  <div>
                    <select name="category" value={updateProduct.category} onChange={onChangeHnadler}>
                      <option value="노트북">노트북</option>
                      <option value="키보드">키보드</option>
                      <option value="마우스">마우스</option>
                    </select>
                  </div>
                  <div>
                    <input type="text" name="title" value={updateProduct.title} onChange={onChangeHnadler} />
                  </div>
                  <div>
                    <input type="text" name="price" value={updateProduct.price} onChange={onChangeHnadler} />
                  </div>
                </StRight>
              </StTitleGroup>
              <hr />
              <StBody>
                <textarea name="content" value={updateProduct.content} onChange={onChangeHnadler} />
              </StBody>
              <StFooter>
                <div>
                  <FontAwesomeIcon icon={faUser} />
                  <span> 호돌이</span>
                  <br />
                  <FontAwesomeIcon icon={faLocationDot} />
                  <input type="text" name="location" value={updateProduct.location} onChange={onChangeHnadler} />
                </div>

                <div>
                  <Button variant="success" onClick={onSaveHandler}>
                    완료
                  </Button>
                  <Button variant="outline-success" onClick={() => setEditMode(false)}>
                    취소
                  </Button>
                </div>
              </StFooter>
            </StCard>
          </>
        ) : (
          <>
            <StCard>
              <StTitleGroup>
                <StRight>
                  <div>노트북</div>
                  <div>맥북 m1 에어 팔아요</div>
                  <div>100,000원</div>
                </StRight>
                <StLeft>
                  <div>1시간 전</div>
                  <div>
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                </StLeft>
              </StTitleGroup>
              <hr />
              <StBody>진짜 싸게 팝니다</StBody>
              {/* <hr /> */}
              <StFooter>
                <div>
                  <FontAwesomeIcon icon={faUser} />
                  <span> 호돌이</span>
                  <br />
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span> 신림역 8번 출구</span>
                </div>
                <div>
                  <Button variant="success" onClick={onUpdateHandler}>
                    수정
                  </Button>
                  <Button variant="outline-success">삭제</Button>
                </div>
              </StFooter>
            </StCard>

            <CommentList />
          </>
        )}
      </Layout>
    </>
  );
};

const StCard = styled(Card)`
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
  gap: 57px;
  flex-direction: column;
  text-align: end;

  div:nth-child(1) {
    font-size: 0.9rem;
    color: #999;
  }

  div:nth-child(2) {
    color: #157347;
    font-size: 1.5rem;
    cursor: pointer;
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

export default Detail;
