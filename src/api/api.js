const config = {
    basePostsUrl: 'https://api.react-learning.ru/v2/group-12/posts',
    baseUsersUrl: `https://api.react-learning.ru/users`,
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

    deletePostById(id) {
        return fetch(`${this.basePostsUrl}/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        }).then(onResponse);
    }
}

export const api = new Api(config);
