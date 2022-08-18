import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { addComment, loadComment } from "../app/slice/commentSlice";
import Comment from "./Comment";

const CommentList = () => {
  const commentData = useSelector((state) => state.comment);
  const { user } = useSelector((state) => state.user);
  const param = useParams();
  console.log(param.productId);
  const commentCount = commentData.length;
  const dispatch = useDispatch();
  const commentInput = useRef();
  console.log(commentData);
  useEffect(() => {
    dispatch(loadComment(param.productId));
  }, [dispatch]);

  return (
    <ListBox>
      <CommentCount>
        댓글 &nbsp;
        <span styled={{ fontWeight: "bold" }}>{commentCount}</span>&nbsp;개
      </CommentCount>
      <FormBox>
        <h5 style={{ margin: "1em 0.5em" }}>{user.nickname}</h5>
        <Form>
          <InputComment
            type="text"
            ref={commentInput}
            placeholder="댓글을 입력해주세요 ! (100자 제한)"
            maxLength="100"
            autoFocus={false}
          />
          <AddCommentBtn
            onClick={(e) => {
              e.preventDefault();
              if (commentInput.current.value === "") {
                return alert("댓글을 입력해주세요 !");
              } else {
                dispatch(
                  addComment({
                    content: commentInput.current.value,
                    productId: param.productId,
                  })
                );
              }
              commentInput.current.value = "";
            }}
          >
            등록
          </AddCommentBtn>
        </Form>
      </FormBox>
      <List style={{ padding: "0" }}>
        {commentData?.map((item) => {
          // boolean button 누르면
          return <Comment key={item.commentId} item={item} />;
        })}
      </List>
    </ListBox>
  );
};

export default CommentList;

const CommentCount = styled.div`
  margin: 5em 0 1em 0;
  font-size: 1.3em;
`;

const ListBox = styled.div`
  width: 100%;
  margin: auto;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: end;
  margin-top: 1em;
  border-bottom: 1px solid lightgray;
  border-top: 1px solid lightgray;
`;

const FormBox = styled.div`
  border: 1px solid lightgray;
  width: 100%;
  background-color: white;
  border-radius: 0.4em;
`;

const InputComment = styled.textarea`
  width: 90%;
  height: 4sem;
  resize: none;
  padding: 0.5em;
  border: 0;
  display: block;

  &:focus {
    outline: 0;
  }
`;

const AddCommentBtn = styled.button`
  width: 5em;
  background-color: #198754;
  border: 0;
  font-weight: bolder;
  color: white;
  height: 3.3em;
  display: inline-block;
  margin: 1em auto 0.5em auto;
  border-radius: 0.4em;
`;

const List = styled.div`
  height: 30em;
`;
