import React, { useEffect } from 'react';
import './postPageView.css';
import { Link, useParams } from 'react-router-dom';
import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';
import { Heart, HeartFill, PencilSquare, ZoomIn } from 'react-bootstrap-icons';
import Comment from '../../components/Comment/Comment';
import Modal from '../../components/Modal/Modal';
import EditPostInfoForm from '../../components/Forms/EditPostInfoForm/EditPostInfoForm';
import { useDispatch, useSelector } from 'react-redux';
import {
    getInfoOnePost,
    getPostAllComments,
    switchLikeOnPost,
} from '../../store/slices/onePostSlice';
import Loader from '../../components/Loader/Loader';
import { activeModal } from '../../store/slices/postsSlice';

const PostPageView = () => {
    const { comments, post, isLoading } = useSelector((s) => s.onePost);
    const { modal } = useSelector((s) => s.posts);
    const { id } = useParams();
    const { user } = useSelector((s) => s.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInfoOnePost(id)).then(() => dispatch(getPostAllComments(id)));
    }, [dispatch, id]);

    const wasLiked = post.likes ? post.likes.includes(user._id) : false;

    const handleLikeOnPost = (_id, wasLiked) => {
        dispatch(switchLikeOnPost({ _id, wasLiked }));
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className='detailsPost'>
                    <GoBackBtn />
                    <div className='detailsPost__main'>
                        <div className='detailsPost__image-wrapper'>
                            <img src={post.image} alt='post' className='detailsPost__image' />
                            <ZoomIn
                                className='detailsPost__zoom'
                                onClick={() => dispatch(activeModal('postImage'))}
                            />
                        </div>
                        <div className='detailsPost__info-wrapper'>
                            {user?._id === post?.author?._id && (
                                <PencilSquare
                                    className='detailsPost__edit'
                                    onClick={() => {
                                        dispatch(activeModal('editPostOnPostPage'));
                                    }}
                                />
                            )}
                            <Link
                                className='detailsPost__link'
                                to={`/profile/${post?.author?._id}`}
                            >
                                <div className='detailsPostInfo__header'>
                                    <img
                                        src={post?.author?.avatar}
                                        alt='avatar'
                                        className='detailsPost__autor-avatar'
                                    />
                                    <div className='detailsPost__autor-info'>
                                        <b>{post?.author?.name}</b>
                                        <span>{post?.author?.about}</span>
                                    </div>
                                </div>
                            </Link>
                            <h3 className='detailsPost__title'>{post?.title}</h3>
                            <p className='detailsPost__text'>{post?.text}</p>
                            <div className='detailsPost__tags'>
                                {!!post?.tags?.length &&
                                    post?.tags?.map((tag, i) => (
                                        <span key={`${tag}+${i}`} className='detailsPost__tag'>
                                            {tag}
                                        </span>
                                    ))}
                            </div>
                            <div className='detailsPostInfo__footer'>
                                <div className='detailsPostInfo__buttons'>
                                    <button
                                        className='detailsPostInfo__button'
                                        onClick={() => handleLikeOnPost(post?._id, wasLiked)}
                                    >
                                        {wasLiked ? <HeartFill fill='red' /> : <Heart />}{' '}
                                        <span>{!!post?.likes?.length && post?.likes?.length}</span>
                                    </button>
                                </div>
                                <span>
                                    {new Date(post?.created_at).toLocaleDateString('ru-RU', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='comments'>
                        <Comment postId={id} comments={comments} />
                    </div>
                    {modal === 'postImage' && (
                        <Modal>
                            <div className='detailsPost__preview-wrap'>
                                <img
                                    className='detailsPost__preview'
                                    src={post?.image}
                                    alt='post'
                                />
                            </div>
                        </Modal>
                    )}
                    {modal === 'editPostOnPostPage' && (
                        <Modal>
                            <EditPostInfoForm editablePost={post} />
                        </Modal>
                    )}
                </div>
            )}
        </>
    );
};

export default PostPageView;
