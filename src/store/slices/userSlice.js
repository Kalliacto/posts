import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { forErrors } from '../../utils/utils';
import { userApi } from '../../api/userApi';
import { setNewUserData } from './profileSlice';
import { toast } from 'react-toastify';

const initialState = {
    user: {},
    isLoading: true,
    isAuth: false,
};

export const getUser = createAsyncThunk(
    'user/getUser',
    async function (data, { fulfillWithValue, rejectWithValue }) {
        try {
            const user = await userApi.getUserInfo();
            return fulfillWithValue(user);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async function (newUserData, { dispatch, fulfillWithValue, rejectWithValue }) {
        try {
            if (newUserData.avatar) {
                const updatedUser = await userApi.changingAvatarInfo({
                    avatar: newUserData.avatar,
                });
                dispatch(setNewUserData(updatedUser));
                return fulfillWithValue(updatedUser);
            }
            const updatedUser = await userApi.changingProfileInfo({
                name: newUserData.name,
                about: newUserData.about,
            });
            dispatch(setNewUserData(updatedUser));
            return fulfillWithValue(updatedUser);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const registration = createAsyncThunk(
    'user/registration',
    async function (data, { fulfillWithValue, rejectWithValue }) {
        try {
            const response = await userApi.signUp(data);
            return fulfillWithValue(response);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const authorization = createAsyncThunk(
    'user/authorization',
    async function (data, { fulfillWithValue, rejectWithValue }) {
        try {
            const response = await userApi.signIn(data);
            return fulfillWithValue(response);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getNewToken = createAsyncThunk(
    'user/getNewToken',
    async function (data, { fulfillWithValue, rejectWithValue }) {
        try {
            const response = await userApi.getTokenByEmail(data);
            return fulfillWithValue(response);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const sendNewPassword = createAsyncThunk(
    'user/sendNewPassword',
    async function (data, { rejectWithValue }) {
        try {
            return await userApi.setNewPassword(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuth(state, { payload }) {
            state.isAuth = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        });

        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            toast.success('Изменения сохранены');
        });

        builder.addCase(authorization.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuth = true;
            toast(`Добро пожаловать ${action.payload.data.name}`);
            localStorage.setItem(
                'postsToken2023',
                JSON.stringify({ token: action.payload.token, group: action.payload.data.group })
            );
        });

        builder.addCase(getNewToken.fulfilled, (state, action) => {
            state.isLoading = false;
            toast.success('Токен отправлен на почту');
        });

        builder.addCase(sendNewPassword.fulfilled, (state, action) => {
            state.isLoading = false;
            toast.success('Ваш пароль успешно изменён');
        });

        builder.addMatcher(
            (action) => forErrors(action, 'user'),
            (state, { payload }) => {
                toast.error(payload);
            }
        );
    },
});

export const { setAuth } = userSlice.actions;
export default userSlice.reducer;
