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
    return JSON.parse(localStorage.getItem('postsToken2023')).token;
};

export const pathsForNoAuth = ['/registration', '/login', '/forgot-password', '/password-reset'];

export const sortItem = [
    { id: 'alphabet', title: 'По алфавиту' },
    { id: 'popular', title: 'Популярные' },
    { id: 'new', title: 'Новые' },
    { id: 'old', title: 'Древние' },
    { id: 'comments', title: 'Наиболее обсуждаемые' },
];

export const refreshGroup = () => {
    return JSON.parse(localStorage.getItem('postsToken2023')).group;
};