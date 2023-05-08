import React, { useContext, useEffect, useState } from 'react';
import './profilePage.css';
import { useParams } from 'react-router-dom';
import { api } from '../../api/api';
import { preloadUser } from '../../utils/utils';
import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';
import { Context } from '../../context/Context';
import PostsList from '../../components/PostsList/PostsList';
import { PencilSquare } from 'react-bootstrap-icons';

const ProfilePage = () => {
    const { user, posts } = useContext(Context);
    const [userInfo, setUserInfo] = useState(preloadUser);
    const [userPosts, setUserPosts] = useState([]);
    const [userFavPosts, setUserFavPosts] = useState([]);
    const { name, about, email, avatar } = userInfo;
    const { userId } = useParams();
    useEffect(() => {
        api.getUserInfoById(userId)
            .then((userData) => {
                setUserInfo(userData);
                const filter = posts.filter(
                    (post) => post.author._id === userId
                );
                setUserPosts(filter);
                const favFilter = posts.filter((post) =>
                    post.likes.includes(userId)
                );
                setUserFavPosts(favFilter);
            })
            .catch((error) =>
                console.error(
                    'Ошибка при запросе данных пользователя в профиле',
                    error
                )
            );
    }, [userId, posts]);
    const myProfile = user._id === userId;
    return (
        <div className="profilePage container">
            <GoBackBtn />
            <div className="profile">
                <div className="profile__avatar-wrapper">
                    <img
                        className="profile__avatar"
                        src={avatar}
                        alt="avatar"
                    />
                    {myProfile && <PencilSquare className="editProfile" />}
                </div>
                <div className="profile__info-wrapper">
                    <div className="profile__info">
                        <h2>Имя:</h2>
                        <span>{name}</span>
                        <h2>email:</h2>
                        <span>{email}</span>
                        <h2>О себе:</h2>
                        <span>{about}</span>
                    </div>
                    {myProfile && <PencilSquare className="editProfile" />}
                </div>
            </div>
            {myProfile ? <h2>Мои посты</h2> : <h2>Все посты пользователя</h2>}
            <div className="userPosts">
                <PostsList posts={userPosts} />
            </div>
            <h2>Понравившиеся посты</h2>
            {!userFavPosts.length ? (
                'Нет понравившихся постов'
            ) : (
                <div className="userFavPosts">
                    <PostsList posts={userFavPosts} />
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
