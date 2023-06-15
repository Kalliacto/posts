import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { forErrors, isLoadingData, showError } from '../../utils/utils';
import { userApi } from '../../api/userApi';

const initialState = {
    user: {},
    isLoading: false,
};

export const getUser = createAsyncThunk(
    'user/getUser',
    async function (str, { getState, fulfillWithValue }) {
        try {
            return await userApi.getUserInfo();
        } catch {}
    }
);

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async function (newUserData, { fulfillWithValue }) {
        try {
            if (newUserData.avatar) {
                return await userApi.changingAvatarInfo({ avatar: newUserData.avatar });
            }
            return await userApi.changingProfileInfo({
                name: newUserData.name,
                about: newUserData.about,
            });
        } catch {}
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        });
        builder.addMatcher(isLoadingData, (state) => {
            state.isLoading = true;
        });
        builder.addMatcher(forErrors, (action) => {
            showError(action.error.message);
        });
    },
});

export default userSlice.reducer;
