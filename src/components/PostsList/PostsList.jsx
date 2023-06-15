import React from 'react';
import './postsList.css';
import Post from '../Post/Post';

const PostsList = ({ posts }) => {
    return (
        <div className='posts__container'>
            {posts?.map((post, i) => {
                return <Post key={`${post._id}+${i}`} post={post} />;
            })}
        </div>
    );
};

export default PostsList;
