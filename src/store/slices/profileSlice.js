import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../api/api';
import { forErrors, isLoadingData, showError } from '../../utils/utils';

const initialState = {
    currentUser: {},
    isLoading: false,
    userPosts: [],
    userFavoritesPosts: [],
};

export const getUserInfoById = createAsyncThunk('', async (id, { getState }) => {
    // const state = getState();
    return await api.getUserInfoById(id);
});

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {},
});
