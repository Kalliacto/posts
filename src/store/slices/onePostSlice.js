import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../api/api';
import { forErrors, isLoadingData, showError } from '../../utils/utils';

const initialState = {
    post: {},
    comments: [],
    isLoading: false,
};

export const getInfoOnePost = createAsyncThunk('post/getInfoOnePost', async (id) => {
    const postInfo = await api.getOnePost(id);
    return postInfo;
});

export const getPostAllComments = createAsyncThunk('post/getPostAllComments', async (id) => {
    const postInfoComments = await api.getPostCommentsAll(id);
    return postInfoComments;
});

export const deleteComment = createAsyncThunk('post/deleteComment', async ({ postId, elemId }) => {
    const newData = await api.deleteCommentPostById(postId, elemId);
    return newData;
});

export const addComment = createAsyncThunk('post/addComment', async (data) => {
    const newData = await api.addNewComment(data.id, data.body);
    return newData;
});

const onePostSlice = createSlice({
    name: 'post',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getInfoOnePost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.post = action.payload;
        });
        builder.addCase(getPostAllComments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.comments = action.payload;
        });
        builder.addCase(deleteComment.fulfilled, (state, action) => {
            state.comments = action.payload.comments;
        });
        builder.addCase(addComment.fulfilled, (state, action) => {
            state.comments = action.payload.comments;
        });
        // builder.addMatcher(isLoadingData, (state) => {
        //     state.isLoading = true;
        // });
        // builder.addMatcher(forErrors, (action) => {
        //     showError(action.error.message);
        // });
    },
});

export default onePostSlice.reducer;
