import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const Comment = () => {
    const commentData = useRef();
    const nickName = useRef();
    const id = new Date().getTime();
    const [comment, setComment] = useState([
        { id: 0, comment: '안눙', nickName: '종현' }
    ]);
    console.log(comment)

    return (
        <CommentList>
            <form>
                <input type="text" ref={commentData} />
                <input type="text" ref={nickName} />
                <button onClick={(e) => {
                    e.preventDefault();
                    setComment([...comment, { comment: commentData.current.value, id, nickName: nickName.current.value }]);
                }}>댓글 작성</button>
            </form>
            <ul>
                {comment.map((item) => {
                    return (
                        <li key={item.id}>
                            <span>{item.nickName}:{item.comment}</span>
                            <button onClick={() => {

                            }}>수정</button>
                            <button onClick={() => {
                                setComment(comment.filter((value) => value.id !== item.id))
                            }}>삭제</button>
                        </li>
                    )
                })}
            </ul>
        </CommentList>
    );
};

export default Comment;

const CommentList = styled.div`
    width: 20em;
    background-color: yellow;
    
`