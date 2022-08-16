<<<<<<< HEAD
import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
=======
import React, { useEffect, useState } from "react";
>>>>>>> 9217655874034229982a5421b7566c9e10aa6302
import { useNavigate } from "react-router-dom";
import { server_url } from "../app/slice";
import axios from "axios";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addProduct } from "../app/slice/productSlice";
import Layout from "../components/common/Layout";
import AWS from "aws-sdk";
import S3upload from "react-aws-s3";

window.Buffer = window.Buffer || require("buffer").Buffer;

const Write = () => {
  const initialState = {
    productId: 0,
    category: "",
    title: "",
    content: "",
    location: "",
    price: null,
    img: "",
  };

  const [EditProduct, setEditProduct] = useState(initialState);
  const [Category, setCategory] = useState("");

  const navi = useNavigate();
  const [imageSrc, setImageSrc] = useState("");
  const [sendImg, setSendImg] = useState({});
  const [imgURL, setImgURL] = useState("");

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

  useEffect(() => {
    const config = {
      accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      region: process.env.REACT_APP_REGION,
    };

    const s3Client = new S3upload(config);

    s3Client.uploadFile(sendImg.file, sendImg.newFileName).then((data) => {
      if (data.status === 204) {
        let imgUrl = data.location;
        console.log(data)
        setImgURL(imgUrl);
      }
    });
  }, [sendImg])

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
        img: imgURL,
      })
    );
  };

  const CategorySelect = (e) => {
    setCategory(e.target.value);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...EditProduct, [name]: value });
  };

  const isTitle = EditProduct.title.length < 5 ? false : true;

  const isCategory = Category === "" ? false : true;

  const isLoacation = EditProduct.location.length < 2 ? false : true;

  const isPrice = EditProduct.price <= 0 ? false : true;

  //

  return (
    <Layout>
      <WriteContainer>
        <PictureCanvas>
          {imageSrc && (
            <img src={imageSrc} width="100%" height="100%" alt="preview-img" />
          )}
        </PictureCanvas>
        {/* <WriteForm > */}
        <WriteForm onSubmit={onSubmitHandler}>
          <ImgUploadBtn>
            <Label for="pic">사진 선택📸</Label>
          </ImgUploadBtn>
          <InputPicture
            id="pic"
            type="file"
            value=""
            accept="image/*"
            onChange={(e) => {
              e.preventDefault();
              let file = e.target.files[0];
              console.log(file)
              let newFileName = e.target.files[0].name;
              setSendImg({ file, newFileName });
              encodeFileToBase64(file);
              console.log(sendImg)

            }}
          />
          <Labelbox>
            <Form.Control
              size="sm"
              type="text"
              placeholder="글제목을 입력해주세요! (25자 이내)"
              name="title"
              value={EditProduct.title}
              onChange={onChangeHandler}
              maxLength="25"
            />
          </Labelbox>
          {!isTitle ? (
            <CheckFail>제목은 5글자 이상이여야 합니다.</CheckFail>
          ) : (
            <CheckDone>사용하실 수 있는 제목입니다.</CheckDone>
          )}
          <Labelbox>
            <Form.Select
              size="sm"
              onChange={CategorySelect}
              value={Form.Select.value}
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
            </Form.Select>
          </Labelbox>
          {!isCategory ? (
            <CheckFail>품목은 필수항목입니다.</CheckFail>
          ) : (
            <CheckDone>올바른 품목입니다.</CheckDone>
          )}
          <Labelbox>
            <Form.Control
              size="sm"
              placeholder="거래 희망 지역은 어디인가요?  (ex : 역삼역 3번출구)"
              name="location"
              value={EditProduct.location}
              onChange={onChangeHandler}
              maxLength="20"
              autoComplete="off"
            />
          </Labelbox>
          {!isLoacation ? (
            <CheckFail>지역은 필수항목이에요!</CheckFail>
          ) : (
            <CheckDone>올바른 형식입니다.</CheckDone>
          )}
          <Labelbox>
            <Form.Control
              size="sm"
              type="number"
              placeholder="희망가격을 입력해주세요! (최대 99,999,999 원)"
              name="price"
              value={EditProduct.price}
              onChange={onChangeHandler}
              max="99999999"
            />
          </Labelbox>
          {!isPrice ? (
            <CheckFail>가격은 필수항목이에요!</CheckFail>
          ) : (
            <CheckDone>올바른 형식입니다.</CheckDone>
          )}

          <Labelbox>
            <Form.Control
              as="textarea"
              rows="8"
              cols="30"
              placeholder="간단한 상품설명을 입력해주세요! (250자 이내)"
              name="content"
              value={EditProduct.content.toLocaleString("ko-KR")}
              onChange={onChangeHandler}
              maxLength="250"
            />
          </Labelbox>

          <ButtonWrap>
<<<<<<< HEAD
            <Button size="lg" variant="success" onClick={onSubmitHandler}>
              등록완료
            </Button>
            <Button size="lg" variant="outline-success">
              취소
            </Button>
=======
            <DoneButton onClick={() => {
              alert('등록완료')
            }}>등록완료</DoneButton>
            <CancelButton>취소</CancelButton>
>>>>>>> 9217655874034229982a5421b7566c9e10aa6302
          </ButtonWrap>
        </WriteForm>
      </WriteContainer>
    </Layout>
  );
};

const WriteContainer = styled.div`
  width: 40em;
  height: 51em;
  margin: 0 auto;
  /* margin: 30em 0 30em 0; */
`;

const WriteForm = styled.form`
  width: 38em;
  height: 30em;
  display: flex;
  margin: 0.7em auto 0 auto;
  flex-direction: column;
  padding: 0 2em 0 2em;
`;

const PictureCanvas = styled.div`
  width: 18rem;
  height: 18rem;
  box-shadow: 0.1em 0.1em 0.4em 0.1em;
  margin: 1.5em auto 0 auto;
`;

const InputPicture = styled.input`
  width: 0em;
  height: 0.5em;
  margin: 0 auto;
  visibility: hidden;
`;

const ImgUploadBtn = styled.div`
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #16995c;
  width: 9em;
  height: 3em;
  display: flex;
  justify-content: center;
  margin: 0 auto 0.7em auto;
`;

const Label = styled.label`
  cursor: pointer;
  font-weight: bold;
  height: 2.5em;
  text-align: center;
  align-items: center;
  display: flex;
`;

const CheckDone = styled.span`
  color: #34a853;
  font-size: 0.8em;
  margin: 0 0.7em;
  font-weight: lighter;
`;

const CheckFail = styled.span`
  color: #999;
  font-size: 0.8em;
  margin: 0 0.7em;
  font-weight: lighter;
`;

const Labelbox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.6em;

  label,
  input {
  }
`;

// const SelectCategory = styled.select`
//   width: 36em;
//   height: 3em;
//   margin: 0 auto;
//   border: none;
//   border-bottom: 3px solid gray;

//   &:focus {
//     outline: none;
//     border-bottom: 3px solid #339966;
//   }
// `;

// 하단버튼 관련 스타일

const ButtonWrap = styled.div`
  margin: 2em auto 0 auto;
  width: 30em;
  height: 5em;
  display: flex;
  justify-content: space-evenly;

  button {
    width: 45%;
  }
`;

export default Write;
