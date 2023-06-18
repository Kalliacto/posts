import { refreshToken } from "../utils/utils";

const config = {
    basePostsUrl: 'https://api.react-learning.ru/v2/group-12/posts',
    headers: {
        'Content-Type': 'application/json',
    },
};

const onResponse = (data) => {
    return data.ok ? data.json() : data.json().then((res) => Promise.reject(res));
};

class Api {
    constructor(data) {
        this.basePostsUrl = data.basePostsUrl;
        this.headers = data.headers;
    }

    getAllPosts() {
        return fetch(`${this.basePostsUrl}`, {
            method: 'GET',
            headers: { ...this.headers, authorization: refreshToken() },
        }).then(onResponse);
    }

    searchPost(path) {
        return fetch(`${this.basePostsUrl}/search/?query=${path}`, {
            headers: { ...this.headers, authorization: refreshToken() },
        }).then(onResponse);
    }

    getOnePost(id) {
        return fetch(`${this.basePostsUrl}/${id}`, {
            headers: { ...this.headers, authorization: refreshToken() },
        }).then(onResponse);
    }

    addNewPost(post) {
        return fetch(`${this.basePostsUrl}`, {
            method: 'POST',
            headers: { ...this.headers, authorization: refreshToken() },
            body: JSON.stringify(post),
        }).then(onResponse);
    }

    setNewInfoPost(id, data) {
        return fetch(`${this.basePostsUrl}/${id}`, {
            method: 'PATCH',
            headers: { ...this.headers, authorization: refreshToken() },
            body: JSON.stringify(data),
        }).then(onResponse);
    }

    changePostLike(postId, isLiked) {
        return fetch(`${this.basePostsUrl}/likes/${postId}`, {
            headers: { ...this.headers, authorization: refreshToken() },
            method: isLiked ? 'DELETE' : 'PUT',
        }).then(onResponse);
    }

    deletePostById(id) {
        return fetch(`${this.basePostsUrl}/${id}`, {
            method: 'DELETE',
            headers: { ...this.headers, authorization: refreshToken() },
        }).then(onResponse);
    }

    getAllComments() {
        return fetch(`${this.basePostsUrl}/comments`, {
            headers: { ...this.headers, authorization: refreshToken() },
        }).then(onResponse);
    }

    getPostCommentsAll(id) {
        return fetch(`${this.basePostsUrl}/comments/${id}`, {
            method: 'GET',
            headers: { ...this.headers, authorization: refreshToken() },
        }).then(onResponse);
    }

    addNewComment(postId, comment) {
        return fetch(`${this.basePostsUrl}/comments/${postId}`, {
            method: 'POST',
            headers: { ...this.headers, authorization: refreshToken() },
            body: JSON.stringify(comment),
        }).then(onResponse);
    }

    deleteCommentPostById(postId, commentId) {
        return fetch(`${this.basePostsUrl}/comments/${postId}/${commentId}`, {
            method: 'DELETE',
            headers: { ...this.headers, authorization: refreshToken() },
        }).then(onResponse);
    }
}

export const api = new Api(config);
