const config = {
    basePostsUrl: 'https://api.react-learning.ru/v2/group-12/posts',
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

class Api {
    constructor(data) {
        this.basePostsUrl = data.basePostsUrl;
        this.baseUsersUrl = data.baseUsersUrl;
        this.baseUrl = data.baseUrl;
        this.headers = data.headers;
    }

    getAllPosts() {
        return fetch(`${this.basePostsUrl}`, {
            method: 'GET',
            headers: this.headers,
        }).then(onResponse);
    }

    searchPost(path) {
        return fetch(`${this.basePostsUrl}/search/?query=${path}`, {
            headers: this.headers,
        }).then(onResponse);
    }

    getOnePost(id) {
        return fetch(`${this.basePostsUrl}/${id}`, {
            headers: this.headers,
        }).then(onResponse);
    }

    addNewPost(post) {
        return fetch(`${this.basePostsUrl}`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(post),
        }).then(onResponse);
    }

    setNewInfoPost(id, data) {
        return fetch(`${this.basePostsUrl}/${id}`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(data),
        }).then(onResponse);
    }

    changePostLike(postId, isLiked) {
        return fetch(`${this.basePostsUrl}/likes/${postId}`, {
            headers: this.headers,
            method: isLiked ? 'DELETE' : 'PUT',
        }).then(onResponse);
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

    deletePostById(id) {
        return fetch(`${this.basePostsUrl}/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        }).then(onResponse);
    }

    getAllComments() {
        return fetch(`${this.basePostsUrl}/comments`, {
            headers: this.headers,
        }).then(onResponse);
    }

    getPostCommentsAll(id) {
        return fetch(`${this.basePostsUrl}/comments/${id}`, {
            method: 'GET',
            headers: this.headers,
        }).then(onResponse);
    }

    addNewComment(postId, comment) {
        return fetch(`${this.basePostsUrl}/comments/${postId}`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(comment),
        }).then(onResponse);
    }

    deleteCommentPostById(postId, commentId) {
        return fetch(`${this.basePostsUrl}/comments/${postId}/${commentId}`, {
            method: 'DELETE',
            headers: this.headers,
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

export const api = new Api(config);
