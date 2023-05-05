import React from 'react';
import './postsListTitle.css';
import SortPosts from '../SortPosts/SortPosts';
import { Arrow90degDown } from 'react-bootstrap-icons';
import ButtonAddPost from '../BattonAddPost/ButtonAddPost';

const PostsListTitle = (props) => {
    return (
        <div className="posts__title">
            <h1>Добро пожаловать к нам!</h1>
            <h3>
                <Arrow90degDown /> Здесь вы можете найти все на любой вкус!
            </h3>

            <div className="wrapper__for_functional">
                <SortPosts />
                <ButtonAddPost title={'Создать новый пост'} />
            </div>
        </div>
    );
};

export default PostsListTitle;
