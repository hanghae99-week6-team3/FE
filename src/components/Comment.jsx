import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment, updateComment } from '../app/slice/commentSlice';

const Comment = ({ id, content, nickname }) => {
    const dispatch = useDispatch();
    const [changeMode, setChangeMode] = useState(false);
    const current_content = useRef();
    return (
        <li key={id}>
            {
                !changeMode ?
                    <>
                        <span>{nickname}:{content}</span>
                        <button onClick={(e) => {
                            e.preventDefault();
                            setChangeMode(true)
                        }}>수정</button>
                    </>
                    :
                    <>
                        <input type="text" defaultValue={content} ref={current_content} />
                        <button onClick={(e) => {
                            e.preventDefault();
                            dispatch(updateComment({ id, content: current_content.current.value, nickname }))
                            setChangeMode(false)
                        }}>등록</button>
                    </>
            }

            <button onClick={() => {
                dispatch(deleteComment(id))
            }}>삭제</button>
        </li>
    );
};

export default Comment;