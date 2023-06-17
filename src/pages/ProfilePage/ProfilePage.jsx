import React, { useContext, useEffect, useState } from 'react';
import './profilePage.css';
import { useParams } from 'react-router-dom';
import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';
import { Context } from '../../context/Context';
import PostsList from '../../components/PostsList/PostsList';
import ChangingAvatar from '../../components/Forms/ChangingAvatar/ChangingAvatar';
import { PencilSquare, XLg } from 'react-bootstrap-icons';
import Modal from '../../components/Modal/Modal';
import EditInfoUserInProfile from '../../components/Forms/EditInfoUserInProfile/EditInfoUserInProfile';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfoById } from '../../store/slices/profileSlice';

const ProfilePage = () => {
    const { activeModal, setActiveModal } = useContext(Context);
    const { user } = useSelector((s) => s.user);
    const { currentUser, userPosts, userFavoritesPosts } = useSelector((s) => s.profile);
    const { name, about, email, avatar } = currentUser;
    const { userId } = useParams();
    const myProfile = user._id === userId;
    const [previewAvatar, setPreviewAvatar] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserInfoById(userId)).then(() => setPreviewAvatar(currentUser.avatar));
    }, [dispatch, userId]);

    return (
        <div className='profilePage'>
            <GoBackBtn />
            <div className='profile'>
                <div className='profile__avatar-wrapper'>
                    <img className='profile__avatar' src={avatar} alt='avatar' />
                    {myProfile && (
                        <PencilSquare
                            className='editProfile'
                            onClick={() => setActiveModal('avatar')}
                        />
                    )}
                    {activeModal === 'avatar' && (
                        <Modal state={activeModal === 'avatar'} setState={setActiveModal}>
                            <ChangingAvatar
                                // setUserInfo={setUserInfo}
                                previewAvatar={previewAvatar}
                                setPreviewAvatar={setPreviewAvatar}
                            />
                        </Modal>
                    )}
                </div>
                <div className='profile__info-wrapper'>
                    {activeModal === 'editUserInfoForm' ? (
                        <EditInfoUserInProfile
                            userInfo={currentUser}
                            // setUserInfo={setUserInfo}
                            setActiveModal={setActiveModal}
                        />
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
                        (myProfile && !(activeModal === 'editUserInfoForm') ? (
                            <PencilSquare
                                className='editProfile'
                                onClick={() => setActiveModal('editUserInfoForm')}
                            />
                        ) : (
                            <XLg className='editProfile' onClick={() => setActiveModal('')} />
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
    );
};

export default ProfilePage;
