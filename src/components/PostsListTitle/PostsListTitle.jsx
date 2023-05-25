import React, { useContext, useState } from 'react';
import './postsListTitle.css';
import SortPosts from '../SortPosts/SortPosts';
import { Arrow90degDown } from 'react-bootstrap-icons';
import ButtonAddPost from '../BattonAddPost/ButtonAddPost';
import Modal from '../Modal/Modal';
import AddPostForm from '../Forms/AddPostForm/AddPostForm';
import { Context } from '../../context/Context';

const PostsListTitle = () => {
    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const { setPreviewPostImage } = useContext(Context);
    return (
        <div className='posts__title'>
            <h1>Добро пожаловать к нам!</h1>
            <div className='posts__title-h3'>
                <Arrow90degDown className='posts__title-arrow' />
                <h3>Здесь вы можете найти все на любой вкус!</h3>
            </div>
            <div className='wrapper__for_functional'>
                <SortPosts />
                <ButtonAddPost
                    title={'Создать новый пост'}
                    onClick={() => {
                        setShowAddPostModal(true);
                        setPreviewPostImage(
                            'https://jkfenner.com/wp-content/uploads/2019/11/default.jpg'
                        );
                    }}
                />
            </div>
            <Modal state={showAddPostModal} setState={setShowAddPostModal}>
                <AddPostForm setShowAddPostModal={setShowAddPostModal} />
            </Modal>
        </div>
    );
};

export default PostsListTitle;
