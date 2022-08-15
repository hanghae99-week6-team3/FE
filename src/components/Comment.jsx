import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment, updateComment } from '../app/slice/commentSlice';
import styled from 'styled-components';

const Comment = ({ item }) => {
    const dispatch = useDispatch();
    const current_content = useRef();
    const [mode, setMode] = useState('read');

    return (
        <L>
            {
                mode === "read" ?
                    <CommentAlign>
                        <CommentInfo>
                            <Nickname>{item.nickname}</Nickname>
                            <Content>{item.content}</Content>
                        </CommentInfo>
                        <DropdwonBox>
                            <DropdownBtn>
                                View More
                            </DropdownBtn>
                            <CommentBtn>
                                <button onClick={() => {
                                    setMode("modify")
                                }}>수정</button>
                                <button onClick={() => {
                                    dispatch(deleteComment(item.id));
                                }}>삭제</button>
                            </CommentBtn>
                        </DropdwonBox>

                    </CommentAlign>
                    :
                    <CommentAlign>
                        <CommentInfo>
                            <Nickname>{item.nickname}</Nickname>
                            <UpdataComment type="text" defaultValue={item.content} ref={current_content} />
                        </CommentInfo>
                        <DropdwonBox>
                            <DropdownBtn>
                                View More
                            </DropdownBtn>
                            <CommentBtn>
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    dispatch(updateComment({ id: item.id, content: current_content.current.value, nickname: item.nickname }))
                                    setMode("read")
                                }}>등록</button>
                                <button onClick={() => {
                                    setMode("read")
                                }}>취소</button>
                            </CommentBtn>
                        </DropdwonBox>
                    </CommentAlign>
            }



        </L>
    );
};

export default Comment;



const L = styled.li`
    list-style:none;
    width: 80%;
`

const Nickname = styled.p`
    width: 80%;
    margin: 1em;
`
const CommentInfo = styled.div`
    display:flex;
    flex-direction:column;
    width: 100%;
`

const CommentBtn = styled.div`
    display: none;
    position: absolute;
    z-index: 1;

`

const DropdwonBox = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    &:hover ${CommentBtn}{
        display: block;
    }
`



const DropdownBtn = styled.button`

`

const Content = styled.span`
    display: flex;
    flex-wrap: wrap;
    margin: 1em;
    width: 90%;
`

const UpdataComment = styled.textarea`
    &:focus {
        outline:0
    };
    margin: 1em;
    border: 0;
    border-bottom:1px solid black;
    width: 90%;
`

const CommentAlign = styled.div`
    display: flex;
    justify-content: space-between
`

