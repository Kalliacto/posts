import React, { useContext } from 'react';
import './postsListTitle.css';
import SortPosts from '../SortPosts/SortPosts';
import { Arrow90degDown } from 'react-bootstrap-icons';
import ButtonAddPost from '../BattonAddPost/ButtonAddPost';
import Modal from '../Modal/Modal';
import AddPostForm from '../Forms/AddPostForm/AddPostForm';
import { Context } from '../../context/Context';

const PostsListTitle = () => {
    const { activeModal, setActiveModal } = useContext(Context);
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
                        setActiveModal('addPostForm');
                    }}
                />
            </div>
            {activeModal === 'addPostForm' && (
                <Modal state={activeModal === 'addPostForm'} setState={setActiveModal}>
                    <AddPostForm setActiveModal={setActiveModal} />
                </Modal>
            )}
        </div>
    );
};

export default PostsListTitle;
