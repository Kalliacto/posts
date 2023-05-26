import React, { useState } from 'react';
import './postsList.css';
import Post from '../Post/Post';
import Modal from '../Modal/Modal';
import EditPostInfoForm from '../Forms/EditPostInfoForm/EditPostInfoForm';

const PostsList = ({ posts }) => {
    // const [editablePost, setEditablePost] = useState({});
    return (
        <>
            <div className='posts__container'>
                {posts.map((post, i) => {
                    return (
                        <Post
                            key={`${post._id}+${i}`}
                            post={post}
                            // setEditablePost={setEditablePost}
                        />
                    );
                })}
            </div>
            
        </>
    );
};

export default PostsList;
