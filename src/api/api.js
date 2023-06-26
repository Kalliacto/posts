import { refreshGroup, refreshToken } from "../utils/utils";

const config = {
    basePostsUrl: 'https://api.react-learning.ru/v2',
    headers: {
        'Content-Type': 'application/json',
    },
};

const onResponse = (data) => {
    return data.ok ? data.json() : data.json().then((error) => Promise.reject(error.message));
};

class Api {
    constructor(data) {
        this.basePostsUrl = data.basePostsUrl;
        this.headers = data.headers;
    }

    getAllPosts() {
        return fetch(`${this.basePostsUrl}/${refreshGroup()}/posts`, {
            method: 'GET',
            headers: { ...this.headers, authorization: refreshToken() },
        }).then(onResponse);
    }

    searchPost(path) {
        return fetch(`${this.basePostsUrl}/${refreshGroup()}/posts/search/?query=${path}`, {
            headers: { ...this.headers, authorization: refreshToken() },
        }).then(onResponse);
    }

    getOnePost(id) {
        return fetch(`${this.basePostsUrl}/${refreshGroup()}/posts/${id}`, {
            headers: { ...this.headers, authorization: refreshToken() },
        }).then(onResponse);
    }

    addNewPost(post) {
        return fetch(`${this.basePostsUrl}/${refreshGroup()}/posts`, {
            method: 'POST',
            headers: { ...this.headers, authorization: refreshToken() },
            body: JSON.stringify(post),
        }).then(onResponse);
    }

    setNewInfoPost(id, data) {
        return fetch(`${this.basePostsUrl}/${refreshGroup()}/posts/${id}`, {
            method: 'PATCH',
            headers: { ...this.headers, authorization: refreshToken() },
            body: JSON.stringify(data),
        }).then(onResponse);
    }

    changePostLike(postId, isLiked) {
        return fetch(`${this.basePostsUrl}/${refreshGroup()}/posts/likes/${postId}`, {
            headers: { ...this.headers, authorization: refreshToken() },
            method: isLiked ? 'DELETE' : 'PUT',
        }).then(onResponse);
    }

    deletePostById(id) {
        return fetch(`${this.basePostsUrl}/${refreshGroup()}/posts/${id}`, {
            method: 'DELETE',
            headers: { ...this.headers, authorization: refreshToken() },
        }).then(onResponse);
    }

    getAllComments() {
        return fetch(`${this.basePostsUrl}/${refreshGroup()}/posts/comments`, {
            headers: { ...this.headers, authorization: refreshToken() },
        }).then(onResponse);
    }

    getPostCommentsAll(id) {
        return fetch(`${this.basePostsUrl}/${refreshGroup()}/posts/comments/${id}`, {
            method: 'GET',
            headers: { ...this.headers, authorization: refreshToken() },
        }).then(onResponse);
    }

    addNewComment(postId, comment) {
        return fetch(`${this.basePostsUrl}/${refreshGroup()}/posts/comments/${postId}`, {
            method: 'POST',
            headers: { ...this.headers, authorization: refreshToken() },
            body: JSON.stringify(comment),
        }).then(onResponse);
    }

    deleteCommentPostById(postId, commentId) {
        return fetch(`${this.basePostsUrl}/${refreshGroup()}/posts/comments/${postId}/${commentId}`, {
            method: 'DELETE',
            headers: { ...this.headers, authorization: refreshToken() },
        }).then(onResponse);
    }
}

export const api = new Api(config);
