export const splitTags = (tags) => {
    return tags.trim().split(',');
};

export const isLoadingData = (data) => {
    if (data.type.includes('Like') || data.type.includes('Comment')) {
        return false;
    }
    return data.type.endsWith('pending');
};

export const forErrors = (action, slice) => {
    return action.type.startsWith(slice) && action.type.endsWith('rejected');
};

export const refreshToken = () => {
    return localStorage.getItem('postsToken2023');
};
