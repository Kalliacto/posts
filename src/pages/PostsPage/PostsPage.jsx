import React, { useContext } from 'react';
import './postsPage.css';
import PostsList from '../../components/PostsList/PostsList';
import { Context } from '../../context/Context';
import PostsListTitle from '../../components/PostsListTitle/PostsListTitle';

const PostsPage = () => {
    const { posts } = useContext(Context);
    return (
        <div className="container">
            <PostsListTitle />
            <PostsList posts={posts} />
        </div>
    );
};

export default PostsPage;
