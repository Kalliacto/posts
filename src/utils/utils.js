import { api } from '../api/api';

export const likeToogle = (postId, wasLiked, setPosts) => {
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

export const onSortPosts = (posts, method, setPosts) => {
    if (method === 'all') {
        const newPosts = posts;
        setPosts([...newPosts]);
    }

    if (method === 'popular') {
        const newPosts = posts.sort((a, b) => b.likes.length - a.likes.length);
        setPosts([...newPosts]);
    }

    if (method === 'new') {
        const newPosts = posts.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setPosts([...newPosts]);
    }

    if (method === 'old') {
        const newPosts = posts.sort(
            (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        setPosts([...newPosts]);
    }
};

export const likeToogleDetailsPage = (
    postId,
    wasLiked,
    setPosts,
    setPostInfo
) => {
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

export const preloadObj = {
    image: '',
    likes: [],
    comments: [],
    tags: [],
    _id: '',
    title: '',
    author: {
        name: '',
        about: '',
        avatar: '',
        _id: '',
    },
    text: '',
    created_at: '',
};