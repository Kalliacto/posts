import React, { useEffect, useState } from 'react';
import './App.css';
import { Context } from './context/Context';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, setAuth } from './store/slices/userSlice';
import { getAllPostsData, searchPosts } from './store/slices/postsSlice';
import { useLocation, useNavigate } from 'react-router-dom';

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [activeModal, setActiveModal] = useState('');
    const { search } = useSelector((s) => s.posts);
    const { isAuth, user } = useSelector((s) => s.user);

    useEffect(() => {
        if (!!localStorage.getItem('postsToken2023')) {
            dispatch(setAuth(true));
        } else {
            if (
                location.pathname.includes('/registration') ||
                location.pathname.includes('/login') ||
                location.pathname.includes('/forgot-password') ||
                location.pathname.includes('/password-reset')
            ) {
                return;
            } else {
                navigate('/login');
            }
        }
    }, [dispatch, isAuth, location, navigate]);

    useEffect(() => {
        if (!isAuth) return;
        dispatch(getUser()).then(() => dispatch(getAllPostsData()));
    }, [dispatch, isAuth]);

    useEffect(() => {
        if (typeof search !== 'string') return;
        const timer = setTimeout(() => {
            dispatch(searchPosts(search));
        }, 400);
        return () => clearTimeout(timer);
    }, [dispatch, search, user]);

    const valueContext = {
        activeModal,
        setActiveModal,
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
