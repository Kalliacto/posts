import React from 'react';
import './post.css';
import { Chat, Heart } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
    const { author, image, title, text, tags, likes, created_at, _id } = post;

    // console.log(new Date('2023-05-02T11:43:04.921Z'));
    return (
        <div className="post">
            <div className="post__header">
                <img
                    src={author.avatar}
                    alt="avatar"
                    className="post__autor-avatar"
                />
                <div className="post__autor-info">
                    <span className="post__autor-name">
                        <b>{author.name}</b>
                    </span>
                    <span className="post__autor-about">{author.about}</span>
                </div>
            </div>
            <Link to={`/${_id}`} className="post__link">
                <h3 className="post__title">{title}</h3>
                <img src={image} alt="post" className="post__image" />
                <p className="post__text">{text}</p>
            </Link>
            <div className="post__tags">
                {!!tags.length &&
                    tags.map((tag) => <span className="post__tag">{tag}</span>)}
            </div>
            <div className="post__footer">
                <div className="post__buttons">
                    <button className="post__button">
                        <Heart />{' '}
                        <span className="post__like-count">
                            {likes.length !== 0 ? likes.length : ''}
                        </span>
                    </button>
                    <button className="post__button">
                        <Chat /> <span className="post__comment-count">1</span>
                    </button>
                </div>
                <span className="post__create-date">{created_at}</span>
            </div>
        </div>
    );
};

export default Post;
