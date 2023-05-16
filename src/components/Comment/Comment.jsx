import React, { useContext, useState } from 'react';
import './comment.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Context } from '../../context/Context';

const Comment = ({ commentData, postAllComment, setPostAllComment }) => {
    const { author, text, created_at } = commentData;
    const [formActive, setFormActive] = useState(false);
    const { register, handleSubmit, reset } = useForm({});
    const { user } = useContext(Context);

    const addCommit = () => {
        console.log('click');
    };

    const deleteCommit = () => {};

    return (
        <>
            <h2>Комментарии</h2>
            <button className='addComment_btn' onClick={() => setFormActive(!formActive)}>
                Написать отзыв
            </button>
            {formActive && (
                <form className='form__comments' onSubmit={handleSubmit(addCommit)}>
                    <textarea
                        type='text'
                        {...register('text')}
                        placeholder='Ваш отзыв'
                        className='form__comments_input'
                        rows={3}
                    />
                    <button type='submit' className='comments_btn'>
                        Отправить
                    </button>
                </form>
            )}
            {!!postAllComment.length ? (
                postAllComment.map((elem) => (
                    <div div className='comment'>
                        <Link className='comment__link' to={`/profile/${elem.author._id}`}>
                            <div className='comment__author'>
                                <img
                                    src={elem.author.avatar}
                                    alt='avatar'
                                    className='comment__author-avatar'
                                />
                                <div className='comment__author-info'>
                                    <b>{elem.author.name}</b>
                                    <span>{elem.author.about}</span>
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
                        <p>{elem.text}</p>
                    </div>
                ))
            ) : (
                <span>Здесь пока нет комментариев</span>
            )}
        </>
    );
};

export default Comment;
