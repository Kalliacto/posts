import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../api/api';
import { forErrors, isLoadingData, showError } from '../../utils/utils';

const initialState = {
    posts: [],
    isLoading: false,
    total: 0,
    search: null,
};

export const getAllPostsData = createAsyncThunk(
    'posts/getAllPostsData',
    async (_, { getState, fulfillWithValue, rejectWithValue }) => {
        try {
            const state = getState();
            const allPosts = await api.getAllPosts();
            return fulfillWithValue({ allPosts, userId: state.user.user._id });
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const searchPosts = createAsyncThunk(
    'posts/searchPosts',
    async (search, { fulfillWithValue, rejectWithValue }) => {
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
    async function ({ _id, wasLiked }, { fulfillWithValue, rejectWithValue }) {
        try {
            const updatedPost = await api.changePostLike(_id, wasLiked);
            return fulfillWithValue(updatedPost);
        } catch (error) {
            alert(`${error}`);
            rejectWithValue(error);
        }
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        sortingPosts: (state, action) => {
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
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        updatePostsState(state, action) {
            state.posts = state.posts.map((e) =>
                e._id === action.payload._id ? action.payload : e
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllPostsData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.posts = action.payload.allPosts;
            state.total = state.posts.length;
        });
        builder.addCase(searchPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.posts = action.payload;
        });
        builder.addCase(switchLike.fulfilled, (state, action) => {
            state.posts = state.posts.map((e) =>
                e._id === action.payload._id ? action.payload : e
            );
        });
        // builder.addMatcher(isLoadingData, (state) => {
        //     state.isLoading = true;
        // });
        // builder.addMatcher(forErrors, (action) => {
        //     showError(action.error.message);
        // });
    },
});

export const { sortingPosts, setSearch, updatePostsState } = postsSlice.actions;
export default postsSlice.reducer;
