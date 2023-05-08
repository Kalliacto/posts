import React, { useContext } from 'react';
import './postsListTitle.css';
import SortPosts from '../SortPosts/SortPosts';
import { Arrow90degDown } from 'react-bootstrap-icons';
import ButtonAddPost from '../BattonAddPost/ButtonAddPost';
import { Context } from '../../context/Context';

const PostsListTitle = () => {
    const { setActiveModal } = useContext(Context);
    const addModal = () => {
        setActiveModal(true);
    };

    return (
        <div className="posts__title">
            <h1>Добро пожаловать к нам!</h1>
            <div className="posts__title-h3">
                <Arrow90degDown className="posts__title-arrow" />
                <h3>Здесь вы можете найти все на любой вкус!</h3>
            </div>
            <div className="wrapper__for_functional">
                <SortPosts />
                <ButtonAddPost
                    title={'Создать новый пост'}
                    addModal={addModal}
                />
            </div>
        </div>
    );
};

export default PostsListTitle;
