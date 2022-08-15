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

                    </CommentAlign>
                    :
                    <CommentAlign>
                        <Nickname>{item.nickname}</Nickname>
                        <UpdataComment type="text" defaultValue={item.content} ref={current_content} />
                        <>
                            <button onClick={(e) => {
                                e.preventDefault()
                                dispatch(updateComment({ id: item.id, content: current_content.current.value, nickname: item.nickname }))
                                setMode("read")
                            }}>등록</button>
                            <button onClick={() => {
                                dispatch(deleteComment(item.id));
                            }}>삭제</button>
                        </>
                    </CommentAlign>
            }



        </L>
    );
};

export default Comment;

const L = styled.li`
    list-style:none;
    width: 40em;
`

const Nickname = styled.span`
    margin: 1em;
`

const Content = styled.span`
    margin: 1em;
    width: 10em;
`

const UpdataComment = styled.input`
    &:focus {
        outline:0
    };
    border: 0;
    border-bottom:1px solid black;
`

const CommentAlign = styled.div`
    display: flex;
    justify-content: space-between
`

const CommentInfo = styled.div`
    display:flex;
    flex-direction:column;
`

const CommentBtn = styled.div`
    display: flex;
    flex-direction:column;
`
const DropdownBtn = styled.button`
    
`