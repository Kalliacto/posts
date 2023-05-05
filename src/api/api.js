const config = {
    baseUrl: 'https://api.react-learning.ru/v2/group-12/posts',
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
        this.baseUrl = data.baseUrl;
        this.headers = data.headers;
    }

    getAllPosts() {
        return fetch(`${this.baseUrl}`, {
            method: 'GET',
            headers: this.headers,
        }).then(onResponse);
    }

    addNewPost() {
        return fetch(`${this.baseUrl}`, {
            method: 'POST',
            headers: this.headers,
        }).then(onResponse);
    }

    searchPost(path) {
        return fetch(`${this.baseUrl}/search/?query=${path}`, {
            headers: this.headers,
        }).then(onResponse);
    }

    getOnePost(id) {
        return fetch(`${this.baseUrl}/${id}`, {
            headers: this.headers,
        }).then(onResponse);
    }

    addNewPost(post) {
        return fetch(`${this.baseUrl}`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(post),
        }).then(onResponse);
    }

    changePostLike(postId, isLiked) {
        return fetch(`${this.baseUrl} /likes/${postId}`, {
            headers: this.headers,
            method: isLiked ? 'DELETE' : 'PUT',
        }).then(onResponse);
    }
}

export const api = new Api(config);
