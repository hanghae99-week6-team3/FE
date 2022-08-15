import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from 'axios';
import { server_url } from '.';

export const loadComment = createAsyncThunk('loadComment',
    async (payload, thunkAPI) => {
        try {
            const { data } = await axios.get(`${server_url}comment`)
            return thunkAPI.fulfillWithValue(data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const addComment = createAsyncThunk('addComment',
    async (payload, thunkAPI) => {
        try {
            await axios.post(`${server_url}comment`, payload)
            const { data } = await axios.get(`${server_url}comment`)
            return thunkAPI.fulfillWithValue(data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteComment = createAsyncThunk('deleteComment',
    async (payload, thunkAPI) => {
        try {
            await axios.delete(`${server_url}comment/` + payload)
            return thunkAPI.fulfillWithValue(payload)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const updateComment = createAsyncThunk('updateComment',
    async (payload, thunkAPI) => {
        try {
            await axios.put(`${server_url}comment/` + payload.id, payload)
            return thunkAPI.fulfillWithValue(payload)
        } catch (error) {
            return thunkAPI.rejectWithValue(payload)
        }
    }
)

const initialState = []


const commentSlice = createSlice({
    name: "commentSlice",
    initialState,
    reducers: {},
    extraReducers: {
        [loadComment.fulfilled]: (state, { payload }) => state = payload,
        [addComment.fulfilled]: (state, { payload }) => state = payload,
        [deleteComment.fulfilled]: (state, { payload }) => current(state).filter((item) => item.id !== payload),
        [updateComment.fulfilled]: (state, { payload }) => current(state).map((item) => item.id === payload.id ? { ...item, content: payload.content } : item)
    }
});




export default commentSlice;
