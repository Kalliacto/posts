import { refreshToken } from "../utils/utils";

const config = {
    baseUsersUrl: 'https://api.react-learning.ru/users',
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'Content-Type': 'application/json',
    },
};

const onResponse = (data) => {
    return data.ok ? data.json() : data.json().then((error) => Promise.reject(error.message));
};

class UserApi {
    constructor(data) {
        this.baseUsersUrl = data.baseUsersUrl;
        this.baseUrl = data.baseUrl;
        this.headers = data.headers;
    }

    getUserInfo() {
        return fetch(`${this.baseUsersUrl}/me`, {
            method: 'GET',
            headers: { ...this.headers, authorization: refreshToken() },
        }).then(onResponse);
    }

    getUserInfoById(id) {
        return fetch(`${this.baseUsersUrl}/${id}`, {
            method: 'GET',
            headers: { ...this.headers, authorization: refreshToken() },
        }).then(onResponse);
    }

    changingProfileInfo(data) {
        return fetch(`${this.baseUsersUrl}/me`, {
            method: 'PATCH',
            headers: { ...this.headers, authorization: refreshToken() },
            body: JSON.stringify(data),
        }).then(onResponse);
    }

    changingAvatarInfo(avatar) {
        return fetch(`${this.baseUsersUrl}/me/avatar`, {
            method: 'PATCH',
            headers: { ...this.headers, authorization: refreshToken() },
            body: JSON.stringify(avatar),
        }).then(onResponse);
    }

    signUp(data) {
        return fetch(`${this.baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...data, group: 'group-12' }),
        }).then(onResponse);
    }
    signIn(data) {
        return fetch(`${this.baseUrl}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(onResponse);
    }
    getTokenByEmail(data) {
        return fetch(`${this.baseUrl}/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(onResponse);
    }
    setNewPassword(data) {
        return fetch(`${this.baseUrl}/password-reset/${data.token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: data.password }),
        }).then(onResponse);
    }
}

export const userApi = new UserApi(config);
