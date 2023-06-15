const config = {
    baseUsersUrl: 'https://api.react-learning.ru/users',
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'Content-Type': 'application/json',
        authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNmYjgyNDMyOTFkNzkwYjNmM2IzMDkiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjgyMDY0ODY3LCJleHAiOjE3MTM2MDA4Njd9.IpO04cd78A6d9Zdit3IkrPueQkJEfh2Xv573sf111Qw',
    },
};

const onResponse = (data) => {
    return data.ok ? data.json() : Promise.reject('Что-то пошло не так');
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
            headers: this.headers,
        }).then(onResponse);
    }

    getUserInfoById(id) {
        return fetch(`${this.baseUsersUrl}/${id}`, {
            method: 'GET',
            headers: this.headers,
        }).then(onResponse);
    }

    changingProfileInfo(data) {
        return fetch(`${this.baseUsersUrl}/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(data),
        }).then(onResponse);
    }

    changingAvatarInfo(avatar) {
        return fetch(`${this.baseUsersUrl}/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
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
        }).then((res) => res.json());
    }
    signIn(data) {
        return fetch(`${this.baseUrl}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => res.json());
    }
    getTokenByEmail(data) {
        return fetch(`${this.baseUrl}/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => res.json());
    }
    setNewPassword(data) {
        return fetch(`${this.baseUrl}/password-reset/${data.token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: data.password }),
        }).then((res) => res.json());
    }
}

export const userApi = new UserApi(config);
