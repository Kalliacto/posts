import React from 'react';
import './post.css';
import { Chat, Heart } from 'react-bootstrap-icons';

const Post = () => {
    return (
        <div className='post'>
            <div className='post__header'>
                <img src='https://v1.popcornnews.ru/k2/news/canvas/1200/upload/news/784626562470.jpg' alt='avatar' className='post__autor-avatar' />
                <div className='post__autor-info'>
                    <span className='post__autor-name'><b>Каптурин Андрей</b></span>
                    <span className='post__autor-about'>Ученик</span>
                </div>
            </div>
            <a href='/' className='post__link'>
            <h3 className="post__title">Заголовок поста</h3>
            <img src='https://cdnn21.img.ria.ru/images/100398/13/1003981317_307:0:1635:1328_1920x0_80_0_0_6661a0796140569f7f5c603dde65fecb.jpg' alt='post' className='post__image' />
            <p className="post__text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo repudiandae recusandae esse deleniti voluptatem? Facilis saepe enim debitis esse facere cupiditate. Mollitia veniam, itaque ducimus iusto et doloremque provident minima?remque provident minima?remque provident minima?remque provident minima?</p>
            </a>
            <div className="post__tags">
                <span className="post__tag">тег</span>
                <span className="post__tag">тег</span>
            </div>
            <div className="post__footer">
                <div className='post__buttons'>
                    <button className='post__button'><Heart /> <span className="post__like-count">1</span></button>
                    <button className='post__button'><Chat /> <span className="post__comment-count">1</span></button>
                </div>
                <span className="post__create-date">03/05/2023</span>
            </div>
        </div>
    );
};

export default Post;