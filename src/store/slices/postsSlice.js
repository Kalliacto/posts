import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../api/api';
import { forErrors, isLoadingData, showError } from '../../utils/utils';

const initialState = {
    posts: [],
    isLoading: false,
    total: 0,
    favoritesPosts: [],
    search: null,
};

const postsSlice = createSlice({});

export default postsSlice.reducer;
