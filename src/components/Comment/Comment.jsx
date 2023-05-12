import React from 'react';
import './comment.css';
import { Link } from 'react-router-dom';

const Comment = ({ commentData }) => {
    const { author, text, created_at } = commentData;
    return (
        <div className='comment'>
            <Link className='comment__link' to={`/profile/${author._id}`}>
                <div className='comment__author'>
                    <img src={author.avatar} alt='avatar' className='comment__author-avatar' />
                    <div className='comment__author-info'>
                        <b>{author.name}</b>
                        <span>{author.about}</span>
                        <span className='comment__create-date'>
                            {new Date(created_at).toLocaleDateString('ru-RU', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </span>
                    </div>
                </div>
            </Link>
            <p>{text}</p>
        </div>
    );
};

export default Comment;
