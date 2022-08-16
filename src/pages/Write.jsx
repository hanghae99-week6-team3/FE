import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { server_url } from "../app/slice";
import axios from "axios";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addProduct } from "../app/slice/productSlice";
import Layout from "../components/common/Layout";

const Write = () => {
  const initialState = {
    productId: 0,
    category: "",
    title: "",
    content: "",
    location: "",
    price: null,
  };

  const [EditProduct, setEditProduct] = useState(initialState);
  const [Category, setCategory] = useState("");

  const [imageSrc, setImageSrc] = useState("");
  const navi = useNavigate();

  const dispatch = useDispatch();

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    navi("/");
    dispatch(
      addProduct({
        title: EditProduct.title,
        price: parseInt(EditProduct.price),
        category: Category,
        location: EditProduct.location,
        content: EditProduct.content,
      })
    );
  };

  const CategorySelect = (e) => {
    setCategory(e.target.value);
    console.log(isCategory);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...EditProduct, [name]: value });
  };

  const isTitle = EditProduct.title.length < 5 ? false : true;

  const isCategory = Category === "" ? false : true;

  const isLoacation = EditProduct.location.length < 2 ? false : true;

  const isPrice = EditProduct.price <= 0 ? false : true;

  return (
    <Layout>
      <WriteContainer>
        <PictureCanvas>
          {imageSrc && (
            <img src={imageSrc} width="100%" height="100%" alt="preview-img" />
          )}
        </PictureCanvas>
        <WriteForm onSubmit={onSubmitHandler}>
          <ImgUploadBtn>
            <Label for="pic">사진 선택📸</Label>
            <ImgDeleteBtn>삭제</ImgDeleteBtn>
          </ImgUploadBtn>
          <InputPicture
            id="pic"
            type="file"
            value=""
            accept="image/*"
            onChange={(e) => {
              encodeFileToBase64(e.target.files[0]);
            }}
          />

          <InputTitle
            placeholder="글제목을 입력해주세요! (25자 이내)"
            name="title"
            value={EditProduct.title}
            onChange={onChangeHandler}
            maxLength="25"
          />

          {!isTitle ? <CheckFail>너무 짧은 제목이네요!</CheckFail> : null}

          <SelectCategory
            onChange={CategorySelect}
            value={SelectCategory.value}
          >
            <option
              defaultValue="select"
              style={{ display: "none", fontWeight: "bold" }}
            >
              품목이 무엇인가요?
            </option>
            <option value="노트북">노트북</option>
            <option value="키보드">키보드</option>
            <option value="마우스">마우스</option>
          </SelectCategory>
          {!isCategory ? <CheckFail>품목은 필수항목이에요!</CheckFail> : null}
          <InputLocation
            placeholder="거래 희망 지역은 어디인가요?  (ex : 역삼역 3번출구)"
            name="location"
            value={EditProduct.location}
            onChange={onChangeHandler}
            maxLength="20"
            autoComplete="off"
          />
          {!isLoacation ? <CheckFail>지역은 필수항목이에요!</CheckFail> : null}
          <InputPrice
            type="number"
            placeholder="희망가격을 입력해주세요! (최대 99,999,999 원)"
            name="price"
            value={EditProduct.price}
            onChange={onChangeHandler}
            max="99999999"
          />
          {!isPrice ? <CheckFail>가격은 필수항목이에요!</CheckFail> : null}
          <InputText
            rows="8"
            cols="30"
            placeholder="간단한 상품설명을 입력해주세요! (250자 이내)"
            name="content"
            value={EditProduct.content.toLocaleString("ko-KR")}
            onChange={onChangeHandler}
            maxLength="250"
          />
          <ButtonWrap>
            <DoneButton onClick={onSubmitHandler}>등록완료</DoneButton>
            <CancelButton>취소</CancelButton>
          </ButtonWrap>
        </WriteForm>
      </WriteContainer>
    </Layout>
  );
};

const WriteContainer = styled.div`
  width: 40em;
  height: 51em;
  border: 1px solid red;
  /* margin: 30em 0 30em 0; */
`;

const WriteForm = styled.form`
  border: 1px solid green;
  width: 38em;
  height: 30em;
  display: flex;
  margin: 1em auto;
  flex-direction: column;
`;

const PictureCanvas = styled.div`
  width: 18rem;
  height: 18rem;
  border: 1px solid black;
  margin: 1.5em auto 0 auto;
`;

const InputPicture = styled.input`
  width: 0em;
  height: 0.5em;
  margin: 0 auto;
  visibility: hidden;
`;

const ImgUploadBtn = styled.div`
  border: 1px solid pink;
  width: 18em;
  height: 2em;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const ImgDeleteBtn = styled.button``;

const Label = styled.label`
  cursor: pointer;
  font-weight: bold;
`;

const CheckDone = styled.span`
  color: green;
  font-size: 0.8em;
  margin: 0 5em;
  font-style: italic;
  font-weight: lighter;
`;

const CheckFail = styled.span`
  color: red;
  font-size: 0.8em;
  margin: 0 5em;
  font-style: italic;
  font-weight: lighter;
`;

const InputTitle = styled.input`
  width: 36em;
  height: 3em;
  margin: 0.5em auto 0 auto;
  border: none;
  border-bottom: 3px solid gray;

  &:focus {
    outline: none;
    border-bottom: 3px solid #339966;
  }
`;

const SelectCategory = styled.select`
  width: 36em;
  height: 3em;
  margin: 0 auto;
  border: none;
  border-bottom: 3px solid gray;

  &:focus {
    outline: none;
    border-bottom: 3px solid #339966;
  }
`;

const InputLocation = styled.input`
  width: 36em;
  height: 3em;
  margin: 0 auto;
  border: none;
  border-bottom: 3px solid gray;

  &:focus {
    outline: none;
    border-bottom: 3px solid #339966;
  }
`;

const InputPrice = styled.input`
  width: 36em;
  height: 3em;
  margin: 0 auto;
  border: none;
  border-bottom: 3px solid gray;

  &:focus {
    outline: none;
    border-bottom: 3px solid #339966;
  }

  &::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`;

const InputText = styled.textarea`
  width: 36em;
  margin: 1.5em auto 0 auto;
  resize: none;
  overflow: scroll;

  &:focus {
    outline: none;
    border-bottom: 3px solid #339966;
  }
`;

// 하단버튼 관련 스타일

const ButtonWrap = styled.div`
  margin: 0 auto;
  width: 30em;
  height: 5em;
  border: 1px solid brown;
  display: flex;
  justify-content: space-evenly;
`;

const DoneButton = styled.button`
  background-color: #4285f4;
  width: 10rem;
  height: 3.5rem;
  border: none;
  border-radius: 5px;
  margin: auto 0;
  color: white;
  font-weight: bold;
  font-size: 1.3em;

  &:hover {
    font-size: 1.35em;
    border: 1px solid indigo;
  }
`;

const CancelButton = styled.button`
  background-color: orange;
  width: 10rem;
  height: 3.5rem;
  border: none;
  border-radius: 5px;
  margin: auto 0;
  color: white;
  font-weight: bold;
  font-size: 1.3em;

  &:hover {
    font-size: 1.35em;
    border: 1px solid gray;
  }
`;

export default Write;
