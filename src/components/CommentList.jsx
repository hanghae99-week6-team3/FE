import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addComment, loadComment, deleteComment } from '../app/slice/commentSlice';
import Comment from './Comment';

const CommentList = () => {
    const commentData = useSelector(state => state.comment);
    const dispatch = useDispatch();
    const commentInput = useRef();
    const nickname = useRef();
    const userId = new Date().getTime();

    console.log(commentData);
    useEffect(() => {
        dispatch(loadComment())
    }, [dispatch])

    return (
        <div>
            <form>
                <input type="text" ref={commentInput} />
                <input type="text" ref={nickname} />
                <button onClick={(e) => {
                    e.preventDefault();
                    if (commentInput.current.value === '') {
                        return alert('댓글을 입력해주세요 !')
                    } else if (nickname.current.value === '') {
                        return alert('닉네임을 입력해주세요 !')
                    } else {
                        dispatch(addComment({ content: commentInput.current.value, userId, nickname: nickname.current.value }));
                    }
                }}>댓글 작성</button>
            </form>
            <ul>
                {commentData?.map((item) => {
                    return <Comment id={item.id} content={item.content} nickname={item.nickname} />
                })}
            </ul>
        </div>
    );
};

export default CommentList;
