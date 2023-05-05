import React, { useContext } from 'react';
import './postsList.css';
import Post from '../Post/Post';

const PostsList = ({ posts }) => {
    return (
        <>
            <div className="posts__wrapper">
                <div className="posts__container">
                    {posts.map((post) => {
                        return <Post key={post._id} post={post} />;
                    })}
                </div>
            </div>
        </>
    );
};

export default PostsList;
