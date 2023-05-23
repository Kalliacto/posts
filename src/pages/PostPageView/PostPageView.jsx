import React, { useContext, useEffect, useState } from 'react';
import './postPageView.css';
import { Link, useParams } from 'react-router-dom';
import { api } from '../../api/api';
import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';
import { Heart, HeartFill, ZoomIn } from 'react-bootstrap-icons';
import { Context } from '../../context/Context';
import { likeToogleDetailsPage, preloadObj } from '../../utils/utils';
import Comment from '../../components/Comment/Comment';
import Modal from '../../components/Modal/Modal';

const PostPageView = () => {
    const { user, setPosts, setActiveModal } = useContext(Context);
    const [postInfo, setPostInfo] = useState(preloadObj);
    const { id } = useParams();
    const { author, image, title, text, tags, likes, created_at } = postInfo;
    const wasLiked = likes.includes(user._id);
    const [postAllComment, setPostAllComment] = useState([]);

    useEffect(() => {
        Promise.all([api.getOnePost(id), api.getPostCommentsAll(id)])
            .then(([postData, commentsData]) => {
                setPostInfo(postData);
                setPostAllComment(commentsData);
            })
            .catch((error) => console.log(error));
    }, [id]);

    return (
        <div className='detailsPost'>
            <GoBackBtn />
            <div className='detailsPost__main'>
                <div className='detailsPost__image-wrapper'>
                    <img src={image} alt='post' className='detailsPost__image' />
                    <ZoomIn className='detailsPost__zoom' onClick={() => setActiveModal(true)} />
                </div>
                <div className='detailsPost__info-wrapper'>
                    <Link to={`/profile/${author._id}`}>
                        <div className='detailsPostInfo__header'>
                            <img
                                src={author.avatar}
                                alt='avatar'
                                className='detailsPost__autor-avatar'
                            />
                            <div className='detailsPost__autor-info'>
                                <b>{author.name}</b>
                                <span>{author.about}</span>
                            </div>
                        </div>
                    </Link>
                    <h3 className='detailsPost__title'>{title}</h3>
                    <p className='detailsPost__text'>{text}</p>
                    <div className='detailsPost__tags'>
                        {!!tags.length &&
                            tags.map((tag, i) => (
                                <span key={`${tag}+${i}`} className='detailsPost__tag'>
                                    {tag}
                                </span>
                            ))}
                    </div>
                    <div className='detailsPostInfo__footer'>
                        <div className='detailsPostInfo__buttons'>
                            <button
                                className='detailsPostInfo__button'
                                onClick={() => {
                                    likeToogleDetailsPage(id, wasLiked, setPosts, setPostInfo);
                                }}
                            >
                                {wasLiked ? <HeartFill fill='red' /> : <Heart />}{' '}
                                <span>{!!likes.length && likes.length}</span>
                            </button>
                        </div>
                        <span>
                            {new Date(created_at).toLocaleDateString('ru-RU', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </span>
                    </div>
                </div>
            </div>
            <div className='comments'>
                <Comment
                    postId={id}
                    postAllComment={postAllComment}
                    setPostAllComment={setPostAllComment}
                />
            </div>
            <Modal children={<img src={image} alt='post' />} />
        </div>
    );
};

export default PostPageView;
