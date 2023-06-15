import React, { useContext } from 'react';
import './post.css';
import { Chat, Heart, HeartFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import { likeToggle } from '../../utils/utils';
import { Trash3 } from 'react-bootstrap-icons';
import { api } from '../../api/api';
import { useSelector } from 'react-redux';

const Post = ({ post }) => {
    const { setPosts } = useContext(Context);
    const { user } = useSelector((s) => s.user);
    const { author, image, title, text, tags, likes, created_at, _id, comments } = post;
    const wasLiked = likes?.includes(user._id);

    const deletePost = async (id) => {
        if (window.confirm('Вы уверены, что хотите удалить данный пост безвозвратно?')) {
            return await api
                .deletePostById(id)
                .then(() => setPosts((state) => state.filter((post) => post._id !== id)))
                .catch((error) => console.log(error));
        }
        return;
    };

    return (
        <div className='post'>
            {user._id === author._id && (
                <Trash3 className='post__trash' onClick={() => deletePost(post._id)} />
            )}
            <Link to={`/profile/${author._id}`}>
                <div className='post__header'>
                    <img src={author.avatar} alt='avatar' className='post__autor-avatar' />
                    <div className='post__autor-info'>
                        <span className='post__autor-name'>
                            <b>{author.name}</b>
                        </span>
                        <span className='post__autor-about'>{author.about}</span>
                    </div>
                </div>
            </Link>
            <Link to={`/post/${_id}`} className='post__link'>
                <h3 className='post__title'>
                    {title.length >= 60 ? title.slice(0, 60) + '...' : title}
                </h3>
                <img src={image} alt='post' className='post__image' />
                <p className='post__text'>
                    {text.length >= 170 ? text.slice(0, 170) + '...' : text}
                </p>
            </Link>
            <div className='post__tags'>
                {!!tags.length &&
                    tags.map((tag, i) => (
                        <span key={`${tag}+${i}`} className='post__tag'>
                            {tag}
                        </span>
                    ))}
            </div>
            <div className='post__footer'>
                <div className='post__buttons'>
                    <button
                        className='post__button'
                        onClick={() => likeToggle(_id, wasLiked, setPosts)}
                    >
                        {wasLiked ? <HeartFill fill='red' /> : <Heart />}{' '}
                        <span className='post__like-count'>{!!likes.length && likes.length}</span>
                    </button>
                    <button className='post__button'>
                        <Chat />{' '}
                        <span className='post__comment-count'>
                            {!!comments.length && comments.length}
                        </span>
                    </button>
                </div>
                <span className='post__create-date'>
                    {new Date(created_at).toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </span>
            </div>
        </div>
    );
};

export default Post;
