import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { addComment, loadComment } from '../app/slice/commentSlice';
import Comment from './Comment';

const CommentList = () => {
    const commentData = useSelector(state => state.comment);
    const param = useParams();
    console.log(param.productId)
    const dispatch = useDispatch();
    const commentInput = useRef();
    console.log(commentData)
    useEffect(() => {
        // dispatch(loadComment());
    }, [dispatch])

    return (
        <ListBox>
            <div style={{ margin: '1em 0' }}>commentCount:xxx</div>
            <FormBox>
                <h5 style={{ margin: '1em 0.5em' }}>내 닉네임</h5>
                <Form>
                    <InputComment type="text" ref={commentInput} placeholder="댓글을 입력해주세요 !" />
                    <AddCommentBtn onClick={(e) => {
                        e.preventDefault();
                        if (commentInput.current.value === '') {
                            return alert('댓글을 입력해주세요 !')
                        } else {
                            dispatch(addComment({ content: commentInput.current.value, productId: param.productId }));
                        }
                        commentInput.current.value = "";
                    }}>등록</AddCommentBtn>
                </Form>
            </FormBox>
            <List style={{ padding: '0' }}>
                {commentData?.map((item) => { // boolean button 누르면 
                    return <Comment key={item.id} item={item} />
                })}
            </List>
        </ListBox>
    );
};

export default CommentList;

const ListBox = styled.div`
    width: 100%;
    margin: auto;
`
const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: end;
`

const FormBox = styled.div`
    border: 1px solid lightgray;
    width: 80%;
    background-color:white;
`



const InputComment = styled.textarea`
    width: 100%;
    height: 8em;
    padding: 0.5em;
    border: 0;
    border-bottom: 1px solid lightgray;
    &:focus {
        outline: 0;
    }
`

const AddCommentBtn = styled.button`
    width: 5em;
    background-color: #2cb300;
    border: 0;
    font-weight: bolder;
    color: white;
    height: 3em;
    display: inline-block;

`

const List = styled.div`
    height: 30em;
`

