import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import { api } from '../../api/api';
import { forErrors } from '../../utils/utils';
import { updatePostsState } from './postsSlice';
import { toast } from 'react-toastify';

const initialState = {
    post: {},
    comments: [],
    isLoading: false,
};

export const getInfoOnePost = createAsyncThunk(
    'post/getInfoOnePost',
    async function (postId, { fulfillWithValue, rejectWithValue }) {
        try {
            const postInfo = await api.getOnePost(postId);
            return fulfillWithValue(postInfo);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const sendUpdatedPostInfo = createAsyncThunk(
    'post/sendUpdatedPostInfo',
    async function ({ editablePost, post }, { dispatch, fulfillWithValue, rejectWithValue }) {
        try {
            const updatedPost = await api.setNewInfoPost(editablePost._id, post);
            dispatch(updatePostsState(updatedPost));
            return fulfillWithValue(updatedPost);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getPostAllComments = createAsyncThunk(
    'post/getPostAllComments',
    async function (postId, { fulfillWithValue, rejectWithValue }) {
        try {
            const postInfoComments = await api.getPostCommentsAll(postId);
            return fulfillWithValue(postInfoComments);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteComment = createAsyncThunk(
    'post/deleteComment',
    async function ({ postId, elemId }, { dispatch, fulfillWithValue, rejectWithValue }) {
        try {
            const updatedPost = await api.deleteCommentPostById(postId, elemId);
            dispatch(updatePostsState(updatedPost));
            return fulfillWithValue(updatedPost);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const addComment = createAsyncThunk(
    'post/addComment',
    async function (data, { dispatch, fulfillWithValue, rejectWithValue }) {
        try {
            const updatedPost = await api.addNewComment(data.id, data.body);
            dispatch(updatePostsState(updatedPost));
            return fulfillWithValue(updatedPost);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const switchLikeOnPost = createAsyncThunk(
    'post/switchLikeOnPost',
    async function ({ _id, wasLiked }, { dispatch, fulfillWithValue, rejectWithValue }) {
        try {
            const updatedPost = await api.changePostLike(_id, wasLiked);
            dispatch(updatePostsState(updatedPost));
            return fulfillWithValue(updatedPost);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

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
            state.comments = action.payload.reverse();
        });

        builder.addCase(deleteComment.fulfilled, (state, action) => {
            state.comments = action.payload.comments.slice().reverse();
        });

        builder.addCase(addComment.fulfilled, (state, action) => {
            state.comments = action.payload.comments.slice().reverse();
        });

        builder.addCase(switchLikeOnPost.fulfilled, (state, action) => {
            state.post = action.payload;
        });

        builder.addCase(sendUpdatedPostInfo.fulfilled, (state, action) => {
            state.post = action.payload;
            toast.success('Изменения сохранены');
        });

        builder.addMatcher(isPending(getInfoOnePost, getPostAllComments), (state) => {
            state.isLoading = true;
        });

        builder.addMatcher(
            (action) => forErrors(action, 'post/'),
            (state, { payload }) => {
                toast.error(payload);
            }
        );
    },
});

export default onePostSlice.reducer;
