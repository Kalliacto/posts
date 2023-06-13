import React, { useEffect, useState } from 'react';
import './App.css';
import { Context } from './context/Context';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { api } from './api/api';
import { preloadObj, preloadUser } from './utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './store/slices/userSlice';

function App() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState(undefined);
    const [activeModal, setActiveModal] = useState('');
    const [previewPostImage, setPreviewPostImage] = useState(
        'https://jkfenner.com/wp-content/uploads/2019/11/default.jpg'
    );
    const [postInfo, setPostInfo] = useState(preloadObj);
    const [postAllComment, setPostAllComment] = useState([]);
    const [userInfo, setUserInfo] = useState(preloadUser);
    const [showPassword, setShowPassword] = useState(false);
    const [auth, setAuth] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    useEffect(() => {
        Promise.all([api.getAllPosts()])
            .then(([postData]) => {
                setPosts(postData);
            })
            .catch((error) =>
                console.error('Ошибка при загрузке данных постов или пользователя', error)
            );
    }, [postInfo, postAllComment, userInfo]);

    useEffect(() => {
        if (search === undefined) return;
        api.searchPost(search)
            .then((data) => setPosts(data))
            .catch((error) => console.log('Ошибка при поиске постов', error));
    }, [search]);

    const valueContext = {
        posts,
        setPosts,
        search,
        setSearch,
        activeModal,
        setActiveModal,
        previewPostImage,
        setPreviewPostImage,
        postInfo,
        setPostInfo,
        postAllComment,
        setPostAllComment,
        userInfo,
        setUserInfo,
        showPassword,
        setShowPassword,
        auth,
        setAuth,
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
