import React from 'react';
import './postsPage.css';
import PostsList from '../../components/PostsList/PostsList';
import PostsListTitle from '../../components/PostsListTitle/PostsListTitle';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';

const PostsPage = () => {
    const { posts, isPostsLoading } = useSelector((s) => s.posts);

    return (
        <>
            <PostsListTitle />
            {isPostsLoading ? <Loader /> : <PostsList posts={posts} />}
        </>
    );
};

export default PostsPage;
