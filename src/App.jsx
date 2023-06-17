import React, { useEffect, useState } from 'react';
import './App.css';
import { Context } from './context/Context';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { api } from './api/api';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './store/slices/userSlice';
import { getAllPostsData, searchPosts } from './store/slices/postsSlice';

function App() {
    const [posts, setPosts] = useState([]);
    const [activeModal, setActiveModal] = useState('');
    const [previewPostImage, setPreviewPostImage] = useState(
        'https://jkfenner.com/wp-content/uploads/2019/11/default.jpg'
    );
    const [postInfo, setPostInfo] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const { search } = useSelector((s) => s.posts);
    const { comments } = useSelector((s) => s.onePost);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser()).then(() => dispatch(getAllPostsData()));
    }, [dispatch]);

    useEffect(() => {
        Promise.all([api.getAllPosts()])
            .then(([postData]) => {
                setPosts(postData);
            })
            .catch((error) =>
                console.error('Ошибка при загрузке данных постов или пользователя', error)
            );
    }, [postInfo, comments, userInfo]);

    useEffect(() => {
        if (search === undefined) return;
        const timer = setTimeout(() => {
            dispatch(searchPosts(search));
        }, 200);
        return () => clearTimeout(timer);
    }, [dispatch, search]);

    const valueContext = {
        posts,
        setPosts,
        activeModal,
        setActiveModal,
        previewPostImage,
        setPreviewPostImage,
        postInfo,
        setPostInfo,
        userInfo,
        setUserInfo,
        showPassword,
        setShowPassword,
    };

    return (
        <div className='App'>
            <Context.Provider value={valueContext}>
                <Header />
                <Main />
                <Footer />
            </Context.Provider>
        </div>
    );
}

export default App;
