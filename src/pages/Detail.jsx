import React, { useLayoutEffect, useState } from "react";
import CommentList from "../components/CommentList";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { __getDetail, __updateDetail } from "../app/slice/detailSlice";
import Button from "react-bootstrap/Button";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faUser, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import { StImage, StCard, StTitleGroup, StRight, StLeft, StBody, StFooter } from "../components/elements/StyledDetail";

const Detail = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { user } = useSelector((state) => state.user);
  const { data, isLoading } = useSelector((state) => state.detail);

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

  useLayoutEffect(() => {
    dispatch(__getDetail(productId));
  }, [dispatch, productId]);

  const onUpdateHandler = () => {
    setUpdateProduct({ ...data.product });
    setEditMode(true);
  };

  // console.log(updateProduct);
  // console.log(data);

  const onSaveHandler = () => {
    if (!updateProduct.title || !updateProduct.location || !updateProduct.price || !updateProduct.content) {
      alert("내용이 비어있습니다.");
    } else {
      dispatch(__updateDetail(updateProduct));
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
        <StImage>
          <img src={data.product?.img} />
        </StImage>

        {editMode ? (
          <>
            <StCard>
              <StTitleGroup>
                <StRight>
                  <div>
                    <Form.Select name="category" value={updateProduct.category} onChange={onChangeHnadler}>
                      <option value="노트북">노트북</option>
                      <option value="키보드">키보드</option>
                      <option value="마우스">마우스</option>
                    </Form.Select>
                  </div>
                  <div>
                    <Form.Control
                      size="lg"
                      type="text"
                      name="title"
                      value={updateProduct.title}
                      onChange={onChangeHnadler}
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    <Form.Control
                      size="lg"
                      type="text"
                      name="price"
                      value={updateProduct.price}
                      onChange={onChangeHnadler}
                    />
                    <span>원</span>
                  </div>
                </StRight>
              </StTitleGroup>
              <hr />
              <StBody>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="content"
                  value={updateProduct.content}
                  onChange={onChangeHnadler}
                />
              </StBody>
              <StFooter>
                <div>
                  <div>
                    <FontAwesomeIcon icon={faUser} />
                    <span> 호돌이</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <Form.Control
                      size="sm"
                      type="text"
                      name="location"
                      value={updateProduct.location}
                      onChange={onChangeHnadler}
                    />
                  </div>
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
                  <div>{data.product?.category}</div>
                  <div>{data.product?.title}</div>
                  <div>{data.product?.price.toLocaleString("ko-KR")}원</div>
                </StRight>
                <StLeft>
                  <div>{data.product?.createdAt}</div>
                  <div>
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                </StLeft>
              </StTitleGroup>
              <hr />
              <StBody>{data.product?.content}</StBody>
              <StFooter>
                <div>
                  <FontAwesomeIcon icon={faUser} />
                  <span> 호돌이</span>
                  <br />
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span> {data.product?.location}</span>
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

export default Detail;
