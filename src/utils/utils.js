import { api } from '../api/api';

export const likeToggle = (postId, wasLiked, setPosts) => {
    api.changePostLike(postId, wasLiked)
        .then((postData) => {
            setPosts((state) => {
                return state.map((post) => {
                    return post._id === postId ? postData : post;
                });
            });
        })
        .catch((error) => console.error('Ошибка при установке лайка', error));
};

export const likeToogleDetailsPage = (postId, wasLiked, setPosts, setPostInfo) => {
    api.changePostLike(postId, wasLiked)
        .then((postData) => {
            setPostInfo(postData);
            setPosts((state) => {
                return state.map((post) => {
                    return post._id === postId ? postData : post;
                });
            });
        })
        .catch((error) => console.error('Ошибка при установке лайка', error));
};

export const splitTags = (tags) => {
    return tags.trim().split(',');
};

export const showError = (error) => {
    return alert(error);
};

export const isLoadingData = (data) => {
    if (data.type.includes('Like') || data.type.includes('Comment')) {
        return false;
    }
    return data.type.endsWith('pending');
};
export const forErrors = (data) => {
    return data.type.endsWith('rejected');
};

export const refreshToken = () => {
    return localStorage.getItem('postsToken2023');
};