import React, { useState } from 'react';
import './comment.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { api } from '../../api/api';
import { Trash } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, deleteComment } from '../../store/slices/onePostSlice';

const Comment = ({ postId, postAllComment }) => {
    const [formActive, setFormActive] = useState(false);
    const { register, handleSubmit, reset } = useForm({});
    const { user } = useSelector((s) => s.user);
    const dispatch = useDispatch();

    const addCommit = async ({ text }) => {
        dispatch(addComment({ id: postId, body: { text } }));
        reset();
        setFormActive(false);
    };

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
                postAllComment.map((elem, i) => (
                    <div key={`${elem.created_at}+${i}`} className='comment'>
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
                                        {new Date(elem.created_at).toLocaleDateString('ru-RU', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>
                            </div>
                        </Link>
                        <p>{elem.text}</p>
                        {user._id === elem.author._id ? (
                            <Trash
                                className='comments__trash'
                                onClick={() => {
                                    console.log(postId, elem._id);
                                    dispatch(deleteComment({ postId, elemId: elem._id }));
                                }}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                ))
            ) : (
                <span>Здесь пока нет комментариев</span>
            )}
        </>
    );
};

export default Comment;
