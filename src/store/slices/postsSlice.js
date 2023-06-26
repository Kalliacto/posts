import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import { api } from '../../api/api';
import { forErrors } from '../../utils/utils';
import { updateProfileLike, updateProfilePosts } from './profileSlice';
import { toast } from 'react-toastify';

const initialState = {
    posts: [],
    isPostsLoading: true,
    total: 0,
    search: null,
    modal: '',
};

export const getAllPostsData = createAsyncThunk(
    'posts/getAllPostsData',
    async function (_, { getState, fulfillWithValue, rejectWithValue }) {
        try {
            const { user } = getState();
            const allPosts = await api.getAllPosts();
            return fulfillWithValue({ allPosts, userId: user.user._id });
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const searchPosts = createAsyncThunk(
    'posts/searchPosts',
    async function (search, { fulfillWithValue, rejectWithValue }) {
        try {
            const searchResult = await api.searchPost(search);
            return fulfillWithValue(searchResult);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const switchLike = createAsyncThunk(
    'posts/switchLike',
    async function ({ _id, wasLiked }, { dispatch, fulfillWithValue, rejectWithValue }) {
        try {
            const updatedPost = await api.changePostLike(_id, wasLiked);
            dispatch(updateProfileLike({ post: updatedPost, wasLiked }));
            return fulfillWithValue(updatedPost);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const sendNewPostInfo = createAsyncThunk(
    'posts/sendNewPostInfo',
    async function (postInfo, { fulfillWithValue, rejectWithValue }) {
        try {
            const newPost = await api.addNewPost(postInfo);
            return fulfillWithValue(newPost);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deletePostFetch = createAsyncThunk(
    'posts/deletePostFetch',
    async function (postId, { dispatch, fulfillWithValue, rejectWithValue }) {
        try {
            const deletedPost = await api.deletePostById(postId);
            dispatch(updateProfilePosts(deletedPost));
            return fulfillWithValue(deletedPost);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        sortingPosts(state, action) {
            switch (action.payload) {
                case 'alphabet':
                    state.posts = state.posts.sort((a, b) => {
                        let textA = a.title.toLowerCase();
                        let textB = b.title.toLowerCase();
                        return textA < textB ? -1 : textA > textB ? 1 : 0;
                    });
                    break;
                case 'comments':
                    state.posts = state.posts.sort((a, b) => b.comments.length - a.comments.length);
                    break;
                case 'popular':
                    state.posts = state.posts.sort((a, b) => b.likes.length - a.likes.length);
                    break;
                case 'new':
                    state.posts = state.posts.sort(
                        (a, b) => new Date(b.created_at) - new Date(a.created_at)
                    );
                    break;
                case 'old':
                    state.posts = state.posts.sort(
                        (a, b) => new Date(a.created_at) - new Date(b.created_at)
                    );
                    break;
                default:
                    state.posts = state.posts.sort((a, b) => a.price - b.price);
            }
        },
        setSearch(state, action) {
            state.search = action.payload;
        },
        updatePostsState(state, action) {
            state.posts = state.posts.map((e) =>
                e._id === action.payload._id ? action.payload : e
            );
        },
        activeModal(state, action) {
            state.modal = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllPostsData.fulfilled, (state, action) => {
            state.isPostsLoading = false;
            state.posts = action.payload.allPosts;
            state.total = state.posts.length;
        });

        builder.addCase(searchPosts.fulfilled, (state, action) => {
            state.isPostsLoading = false;
            state.posts = action.payload;
        });

        builder.addCase(switchLike.fulfilled, (state, action) => {
            state.posts = state.posts.map((e) =>
                e._id === action.payload._id ? action.payload : e
            );
        });

        builder.addCase(sendNewPostInfo.fulfilled, (state, action) => {
            state.posts.unshift(action.payload);
        });

        builder.addCase(deletePostFetch.fulfilled, (state, action) => {
            state.posts = state.posts.filter((e) => e._id !== action.payload._id);
        });

        builder.addMatcher(isPending(getAllPostsData, searchPosts), (state) => {
            state.isPostsLoading = true;
        });

        builder.addMatcher(
            (action) => forErrors(action, 'posts'),
            (state, { payload }) => {
                toast.error(payload);
            }
        );
    },
});

export const { sortingPosts, setSearch, updatePostsState, activeModal } = postsSlice.actions;
export default postsSlice.reducer;
