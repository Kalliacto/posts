import React, { useEffect, useState } from 'react';
import './App.css';
import { Context } from './context/Context';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './store/slices/userSlice';
import { getAllPostsData, searchPosts } from './store/slices/postsSlice';

function App() {
    const [activeModal, setActiveModal] = useState('');
    const [previewPostImage, setPreviewPostImage] = useState(
        'https://jkfenner.com/wp-content/uploads/2019/11/default.jpg'
    );
    const [showPassword, setShowPassword] = useState(false);
    const { search } = useSelector((s) => s.posts);
    const { user } = useSelector((s) => s.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser()).then(() => dispatch(getAllPostsData()));
    }, [dispatch]);

    useEffect(() => {
        if (typeof(search) !== 'string') return;
        const timer = setTimeout(() => {
            dispatch(searchPosts(search));
        }, 400);
        return () => clearTimeout(timer);
    }, [dispatch, search, user]);

    const valueContext = {
        activeModal,
        setActiveModal,
        previewPostImage,
        setPreviewPostImage,
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
