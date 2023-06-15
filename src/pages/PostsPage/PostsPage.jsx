import React from 'react';
import './postsPage.css';
import PostsList from '../../components/PostsList/PostsList';
import PostsListTitle from '../../components/PostsListTitle/PostsListTitle';
import { useSelector } from 'react-redux';

const PostsPage = () => {
    const { posts } = useSelector((s) => s.posts);

    return (
        <>
            <PostsListTitle />
            {!!posts.length && <PostsList posts={posts} />}
        </>
    );
};

export default PostsPage;
