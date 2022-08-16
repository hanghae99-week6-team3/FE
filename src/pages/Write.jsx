<<<<<<< HEAD
import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
=======
import React, { useEffect, useState } from "react";
>>>>>>> 9217655874034229982a5421b7566c9e10aa6302
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addProduct } from "../app/slice/productSlice";
import Layout from "../components/common/Layout";
import S3upload from "react-aws-s3";
import imageCompression from "browser-image-compression";

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
            <ImgDeleteBtn>삭제</ImgDeleteBtn>
          </ImgUploadBtn>
          <InputPicture
            id="pic"
            type="file"
            value=""
            accept="image/*"
            onChange={async (e) => {
              e.preventDefault();
              let file = e.target.files[0];
              let newFileName = e.target.files[0].name;

              const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true
              }
              console.log('originalFile instanceof Blob', file instanceof Blob); // true
              console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

              const compressedFile = await imageCompression(file, options);
              console.log('compressedFile instanceof Blob', compressedFile instanceof Blob);
              console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);
              setSendImg({ file: compressedFile, newFileName });
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

          <InputTitle
            placeholder="글제목을 입력해주세요! (25자 이내)"
            name="title"
            value={EditProduct.title}
            onChange={onChangeHandler}
            maxLength="25"
          />

          {!isTitle ? <CheckFail>너무 짧은 제목이네요!</CheckFail> : null}
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
            placeholder="거래 희망 지역은 어디인가요?  (ex : 역삼역 2번출구)"
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
  border: 1px solid red;
  margin: 0 auto;
  /* margin: 30em 0 30em 0; */
`;

const WriteForm = styled.form`
  border: 1px solid green;
  width: 38em;
  height: 30em;
  display: flex;
  margin: 1em auto;
  margin: 0.7em auto 0 auto;
  flex-direction: column;
  padding: 0 2em 0 2em;
`;

const PictureCanvas = styled.div`
  width: 18rem;
  height: 18rem;
  border: 1px solid black;
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
  border: 1px solid pink;
  width: 18em;
  height: 2em;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #16995c;
  width: 9em;
  height: 3em;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin: 0 auto 0.7em auto;
`;

const ImgDeleteBtn = styled.button``;

const Label = styled.label`
  cursor: pointer;
  font-weight: bold;
  height: 2.5em;
  text-align: center;
  align-items: center;
  display: flex;
`;

const CheckDone = styled.span`
  color: green;
  color: #34a853;
  font-size: 0.8em;
  margin: 0 5em;
  font-style: italic;
  margin: 0 0.7em;
  font-weight: lighter;
`;

const CheckFail = styled.span`
  color: red;
  color: #999;
  font-size: 0.8em;
  margin: 0 5em;
  font-style: italic;
  margin: 0 0.7em;
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
const Labelbox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.6em;

  &::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
  label,
  input {
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
  margin: 0 auto;
  margin: 2em auto 0 auto;
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
  button {
    width: 45%;
  }
`;

export default Write;
