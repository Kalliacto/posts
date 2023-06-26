import React, { useEffect } from 'react';
import './profilePage.css';
import { useParams } from 'react-router-dom';
import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';
import PostsList from '../../components/PostsList/PostsList';
import ChangingAvatar from '../../components/Forms/ChangingAvatar/ChangingAvatar';
import { PencilSquare, XLg } from 'react-bootstrap-icons';
import Modal from '../../components/Modal/Modal';
import EditInfoUserInProfile from '../../components/Forms/EditInfoUserInProfile/EditInfoUserInProfile';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfoById, setMyProfile } from '../../store/slices/profileSlice';
import Loader from '../../components/Loader/Loader';
import { activeModal } from '../../store/slices/postsSlice';

const ProfilePage = () => {
    const { user } = useSelector((s) => s.user);
    const { currentUser, userPosts, userFavoritesPosts, isProfileLoading, myProfile } = useSelector(
        (s) => s.profile
    );
    const { isPostsLoading, modal } = useSelector((s) => s.posts);
    const { name, about, email, avatar } = currentUser;
    const { userId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!!Object.keys(user).length && !isPostsLoading) {
            dispatch(setMyProfile(user._id === userId));
            dispatch(getUserInfoById(userId));
        }
    }, [dispatch, userId, isPostsLoading, user]);

    return (
        <>
            {isProfileLoading ? (
                <Loader />
            ) : (
                <div className='profilePage'>
                    <GoBackBtn />
                    <div className='profile'>
                        <div className='profile__avatar-wrapper'>
                            <img className='profile__avatar' src={avatar} alt='avatar' />
                            {myProfile && (
                                <PencilSquare
                                    className='editProfile'
                                    onClick={() => dispatch(activeModal('avatar'))}
                                />
                            )}
                            {modal === 'avatar' && (
                                <Modal>
                                    <ChangingAvatar userInfo={currentUser} />
                                </Modal>
                            )}
                        </div>
                        <div className='profile__info-wrapper'>
                            {modal === 'editUserInfoForm' ? (
                                <EditInfoUserInProfile userInfo={currentUser} />
                            ) : (
                                <div className='profile__info'>
                                    <h2>Имя:</h2>
                                    <span>{name}</span>
                                    <h2>О себе:</h2>
                                    <span>{about}</span>
                                    <h2>email:</h2>
                                    <span>{email}</span>
                                </div>
                            )}
                            {myProfile &&
                                (myProfile && !(modal === 'editUserInfoForm') ? (
                                    <PencilSquare
                                        className='editProfile'
                                        onClick={() => dispatch(activeModal('editUserInfoForm'))}
                                    />
                                ) : (
                                    <XLg
                                        className='editProfile'
                                        onClick={() => dispatch(activeModal(''))}
                                    />
                                ))}
                        </div>
                    </div>
                    <div className='userPosts'>
                        {myProfile ? (
                            <h2 className='profilePage__title'>Мои посты</h2>
                        ) : (
                            <h2 className='profilePage__title'>Все посты пользователя</h2>
                        )}
                        <PostsList posts={userPosts} />
                    </div>
                    {userFavoritesPosts.length ? (
                        <div className='userFavPosts'>
                            <h2 className='profilePage__title'>Понравившиеся посты</h2>
                            <PostsList posts={userFavoritesPosts} />
                        </div>
                    ) : (
                        'Нет понравившихся постов'
                    )}
                </div>
            )}
        </>
    );
};

export default ProfilePage;
