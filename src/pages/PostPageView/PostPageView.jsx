import React, { useContext, useEffect } from 'react';
import './postPageView.css';
import { Link, useParams } from 'react-router-dom';
import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';
import { Heart, HeartFill, PencilSquare, ZoomIn } from 'react-bootstrap-icons';
import { Context } from '../../context/Context';
import { likeToogleDetailsPage } from '../../utils/utils';
import Comment from '../../components/Comment/Comment';
import Modal from '../../components/Modal/Modal';
import EditPostInfoForm from '../../components/Forms/EditPostInfoForm/EditPostInfoForm';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoOnePost, getPostAllComments } from '../../store/slices/onePostSlice';

const PostPageView = () => {
    const { activeModal, setActiveModal, setPreviewPostImage, setPostInfo } = useContext(Context);

    const { id } = useParams();
    const { user } = useSelector((s) => s.user);
    const { comments: postAllComment, post: postInfo } = useSelector((s) => s.onePost);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInfoOnePost(id)).then(() => dispatch(getPostAllComments(id)));
    }, [id]);

    const wasLiked = postInfo.likes ? postInfo.likes.includes(user._id) : false;

    return (
        <>
            {Object.keys(postInfo).length && (
                <div className='detailsPost'>
                    <GoBackBtn />
                    <div className='detailsPost__main'>
                        <div className='detailsPost__image-wrapper'>
                            <img src={postInfo.image} alt='post' className='detailsPost__image' />
                            <ZoomIn
                                className='detailsPost__zoom'
                                onClick={() => setActiveModal('postImage')}
                            />
                        </div>
                        <div className='detailsPost__info-wrapper'>
                            {user._id === postInfo?.author._id && (
                                <PencilSquare
                                    className='detailsPost__edit'
                                    onClick={() => {
                                        setActiveModal('editPostOnPostPage');
                                        setPreviewPostImage(postInfo.image);
                                    }}
                                />
                            )}
                            <Link
                                className='detailsPost__link'
                                to={`/profile/${postInfo.author._id}`}
                            >
                                <div className='detailsPostInfo__header'>
                                    <img
                                        src={postInfo.author.avatar}
                                        alt='avatar'
                                        className='detailsPost__autor-avatar'
                                    />
                                    <div className='detailsPost__autor-info'>
                                        <b>{postInfo.author.name}</b>
                                        <span>{postInfo.author.about}</span>
                                    </div>
                                </div>
                            </Link>
                            <h3 className='detailsPost__title'>{postInfo.title}</h3>
                            <p className='detailsPost__text'>{postInfo.text}</p>
                            <div className='detailsPost__tags'>
                                {!!postInfo.tags.length &&
                                    postInfo.tags.map((tag, i) => (
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
                                            // likeToogleDetailsPage(id, wasLiked, setPosts, setPostInfo);
                                        }}
                                    >
                                        {wasLiked ? <HeartFill fill='red' /> : <Heart />}{' '}
                                        <span>
                                            {!!postInfo.likes.length && postInfo.likes.length}
                                        </span>
                                    </button>
                                </div>
                                <span>
                                    {new Date(postInfo.created_at).toLocaleDateString('ru-RU', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='comments'>
                        <Comment postId={id} postAllComment={postAllComment} />
                    </div>
                    {activeModal === 'postImage' && (
                        <Modal state={activeModal === 'postImage'} setState={setActiveModal}>
                            <div className='detailsPost__preview-wrap'>
                                <img
                                    className='detailsPost__preview'
                                    src={postInfo.image}
                                    alt='post'
                                />
                            </div>
                        </Modal>
                    )}
                    {activeModal === 'editPostOnPostPage' && (
                        <Modal
                            state={activeModal === 'editPostOnPostPage'}
                            setState={setActiveModal}
                        >
                            <EditPostInfoForm
                                editablePost={postInfo}
                                setActiveModal={setActiveModal}
                                setPostInfo={setPostInfo}
                            />
                        </Modal>
                    )}
                </div>
            )}
        </>
    );
};

export default PostPageView;
