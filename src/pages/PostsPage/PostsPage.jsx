import React, { useContext } from 'react';
import './postsPage.css';
import PostsList from '../../components/PostsList/PostsList';
import { Context } from '../../context/Context';
import SortPosts from '../../components/SortPosts/SortPosts';

const PostsPage = () => {
    const { posts } = useContext(Context);
    return (
        <div className="container">
            <SortPosts />
            <PostsList posts={posts} />
        </div>
    );
};

export default PostsPage;
