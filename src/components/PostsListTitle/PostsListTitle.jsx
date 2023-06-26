import React from 'react';
import './postsListTitle.css';
import SortPosts from '../SortPosts/SortPosts';
import { Arrow90degDown } from 'react-bootstrap-icons';
import ButtonAddPost from '../BattonAddPost/ButtonAddPost';
import Modal from '../Modal/Modal';
import AddPostForm from '../Forms/AddPostForm/AddPostForm';
import { useDispatch, useSelector } from 'react-redux';
import { activeModal } from '../../store/slices/postsSlice';

const PostsListTitle = () => {
    const { modal } = useSelector((s) => s.posts);
    const dispatch = useDispatch();

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
                        dispatch(activeModal('addPostForm'));
                    }}
                />
            </div>
            {modal === 'addPostForm' && (
                <Modal>
                    <AddPostForm />
                </Modal>
            )}
        </div>
    );
};

export default PostsListTitle;
