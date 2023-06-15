import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { forErrors, isLoadingData, showError } from '../../utils/utils';
import { userApi } from '../../api/userApi';

const initialState = {
    currentUser: {},
    isLoading: false,
    userPosts: [],
    userFavoritesPosts: [],
};

export const getUserInfoById = createAsyncThunk('', async (id, { getState }) => {
    // const state = getState();
    return await userApi.getUserInfoById(id);
});

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {},
});
