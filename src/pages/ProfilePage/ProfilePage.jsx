import React, { useContext, useEffect, useState } from 'react';
import './profilePage.css';
import { useParams } from 'react-router-dom';
import { api } from '../../api/api';
import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';
import { Context } from '../../context/Context';
import PostsList from '../../components/PostsList/PostsList';
import ChangingAvatar from '../../components/Forms/ChangingAvatar/ChangingAvatar';
import { PencilSquare, XLg } from 'react-bootstrap-icons';
import Modal from '../../components/Modal/Modal';
import EditInfoUserInProfile from '../../components/Forms/EditInfoUserInProfile/EditInfoUserInProfile';

const ProfilePage = () => {
    const { user, userInfo, setUserInfo, posts, activeModal, setActiveModal } = useContext(Context);
    const [userPosts, setUserPosts] = useState([]);
    const [userFavPosts, setUserFavPosts] = useState([]);
    const { name, about, email, avatar } = userInfo;
    const { userId } = useParams();
    const myProfile = user._id === userId;
    const [previewAvatar, setPreviewAvatar] = useState('');

    useEffect(() => {
        api.getUserInfoById(userId)
            .then((userData) => {
                setUserInfo(userData);
                setPreviewAvatar(userData.avatar);
            })
            .catch((error) =>
                console.error('Ошибка при запросе данных пользователя в профиле', error)
            );
    }, [userId, setUserInfo]);

    useEffect(() => {
        const filter = posts.filter((post) => post.author._id === userId);
        setUserPosts(filter);
        const favFilter = posts.filter((post) => post.likes.includes(userId));
        setUserFavPosts(favFilter);
    }, [userId, posts]);

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
                                setUserInfo={setUserInfo}
                                previewAvatar={previewAvatar}
                                setPreviewAvatar={setPreviewAvatar}
                            />
                        </Modal>
                    )}
                </div>
                <div className='profile__info-wrapper'>
                    {activeModal === 'editUserInfoForm' ? (
                        <EditInfoUserInProfile
                            userInfo={userInfo}
                            setUserInfo={setUserInfo}
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

            {!userFavPosts.length ? (
                'Нет понравившихся постов'
            ) : (
                <div className='userFavPosts'>
                    <h2 className='profilePage__title'>Понравившиеся посты</h2>
                    <PostsList posts={userFavPosts} />
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
