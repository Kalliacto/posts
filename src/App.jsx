import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, setAuth } from './store/slices/userSlice';
import { getAllPostsData, searchPosts } from './store/slices/postsSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { pathsForNoAuth } from './utils/utils';

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { search } = useSelector((s) => s.posts);
    const { isAuth } = useSelector((s) => s.user);

    useEffect(() => {
        if (!!localStorage.getItem('postsToken2023')) {
            dispatch(setAuth(true));
        } else {
            if (!pathsForNoAuth.includes(location.pathname)) {
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
    }, [dispatch, search]);

    return (
        <div className='App'>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default App;
