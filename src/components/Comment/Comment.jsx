import React, { useContext, useState } from 'react';
import './comment.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Context } from '../../context/Context';
import { api } from '../../api/api';
import { Trash } from 'react-bootstrap-icons';

const Comment = ({ postId, postAllComment, setPostAllComment }) => {
    const [formActive, setFormActive] = useState(false);
    const { register, handleSubmit, reset } = useForm({});
    const { user } = useContext(Context);

    const addCommit = async (comment) => {
        return await api
            .addNewComment(postId, comment)
            .then((comment) => setPostAllComment(comment.comments))
            .then(reset())
            .then(setFormActive(false))
            .catch((error) => console.log(error));
    };

    const deleteCommit = async (commentId) => {
        return await api
            .deleteCommentPostById(postId, commentId)
            .then(() =>
                setPostAllComment((state) =>
                    state.filter((postComment) => postComment._id !== commentId)
                )
            )
            .catch((error) => console.log(error));
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
                                onClick={() => deleteCommit(elem._id)}
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
