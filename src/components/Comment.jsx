import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, updateComment } from "../app/slice/commentSlice";
import styled from "styled-components";
import { faListDots } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comment = ({ item }) => {
  const dispatch = useDispatch();
  const current_content = useRef();
  const [mode, setMode] = useState("read");
  const { user } = useSelector((state) => state.user);

  return (
    <L>
      {mode === "read" ? (
        <CommentAlign>
          <CommentInfo>
            <Nickname>{item.nickname}</Nickname>
            <Content>{item.content}</Content>
          </CommentInfo>
          {item.nickname === user.nickname ? (
            <DropdwonBox>
              <DropdownBtn>
                <FontAwesomeIcon
                  color="#999"
                  size="2x"
                  icon={faListDots}
                ></FontAwesomeIcon>
              </DropdownBtn>
              <CommentBtn>
                <ModifyBtn
                  onClick={() => {
                    setMode("modify");
                  }}
                >
                  수정
                </ModifyBtn>
                <DeleteBtn
                  onClick={() => {
                    console.log(item.commentId);
                    dispatch(deleteComment(item.commentId));
                  }}
                >
                  삭제
                </DeleteBtn>
              </CommentBtn>
            </DropdwonBox>
          ) : null}
        </CommentAlign>
      ) : (
        <CommentAlign>
          <CommentInfo>
            <Nickname>{item.nickname}</Nickname>
            <UpdataComment
              type="text"
              defaultValue={item.content}
              ref={current_content}
              autoFocus
            />
          </CommentInfo>
          <DropdwonBox>
            <DropdownBtn>
              <FontAwesomeIcon
                color="#198754"
                size="2x"
                icon={faCheck}
              ></FontAwesomeIcon>
            </DropdownBtn>
            <CommentBtn>
              <DoneBtn
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    updateComment({
                      commentId: item.commentId,
                      content: current_content.current.value,
                    })
                  );
                  setMode("read");
                }}
              >
                등록
              </DoneBtn>
              <CancelBtn
                onClick={() => {
                  setMode("read");
                }}
              >
                취소
              </CancelBtn>
            </CommentBtn>
          </DropdwonBox>
        </CommentAlign>
      )}
    </L>
  );
};

export default Comment;

const L = styled.li`
  list-style: none;
  width: 80%;
`;

const Nickname = styled.p`
  width: 80%;
  margin: 1em;
  font-weight: bold;
`;
const CommentInfo = styled.div`
  display: flex;
  border-bottom: 1px solid #999;
  flex-direction: column;
  width: 100%;
`;

const CommentBtn = styled.div`
  display: none;
  position: absolute;
  z-index: 1;
`;

const DropdwonBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #999;
  width: 7em;
  justify-content: center;

  &:hover ${CommentBtn} {
    display: flex;
    flex-direction: column;
  }
`;

const DropdownBtn = styled.button`
  border: none;
  background-color: white;
`;

const Content = styled.span`
  display: flex;
  flex-wrap: wrap;
  margin: 1em;
  width: 90%;
`;

const UpdataComment = styled.textarea`
  &:focus {
    outline: 0;
  }
  border: none;
  border-bottom: 3px solid #198754;
  margin: 1em 1em 1em 1em;
  width: 90%;
  resize: none;
  height: 1.5em;
  overflow: hidden;
`;

const CommentAlign = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60em;
`;

const ModifyBtn = styled.button`
  width: 4em;
  height: 2.5em;
  border: none;
  background-color: white;
`;
const DeleteBtn = styled.button`
  width: 4em;
  height: 2.5em;
  border: none;
  background-color: white;
`;
const DoneBtn = styled.button`
  width: 4em;
  height: 2.5em;
  border: none;
  background-color: white;
`;

const CancelBtn = styled.button`
  width: 4em;
  height: 2.5em;
  border: none;
  background-color: white;
`;
