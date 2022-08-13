import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, updateComment } from '../app/slice/commentSlice';
import styled from 'styled-components';

const Comment = ({ item, setRefresh }) => {
    const dispatch = useDispatch();
    const current_content = useRef();
    const [mode, setMode] = useState('read');
    console.log(mode)

    return (
        //이 부분이 useSelector로 받아온 데이터를 map으로 돌린 부분입니다 !
        <L>
            {
                mode === "read" ?
                    <>
                        <Nickname>{item.nickname}</Nickname>
                        <Content>{item.content}</Content>
                        <button onClick={() => {
                            setMode("modify")
                        }}>수정</button>

                    </>
                    :
                    <>
                        <Nickname>{item.nickname}</Nickname>
                        <input type="text" defaultValue={item.content} ref={current_content} />
                        <button onClick={(e) => {
                            e.preventDefault()
                            dispatch(updateComment({ id: item.id, content: current_content.current.value, nickname: item.nickname }))
                            setMode("read")
                            setRefresh(prev => !prev)
                        }}>등록</button>
                    </>
            }
            <button onClick={() => {
                dispatch(deleteComment(item.id));
                setRefresh(prev => !prev)
            }}>삭제</button>


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