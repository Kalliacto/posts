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

export const onSortPosts = (posts, method, setPosts, users) => {
    if (method === 'alphabet') {
        const newPosts = posts.sort((a, b) => {
            let textA = a.title.toLowerCase();
            let textB = b.title.toLowerCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        setPosts([...newPosts]);
    }

    if (method === 'comments') {
        const newPosts = posts.sort(
            (a, b) => b.comments.length - a.comments.length
        );
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
