import React, { useEffect, useState } from 'react';
import './App.css';
import { Context } from './context/Context';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { api } from './api/api';
import Modal from './components/Modal/Modal';

function App() {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState(undefined);
    const [activeModal, setActiveModal] = useState(false);

    useEffect(() => {
        Promise.all([api.getAllPosts(), api.getUserInfo()])
            .then(([postData, userData]) => {
                setPosts(postData);
                setUser(userData);
            })
            .catch((error) =>
                console.error('Ошибка при загрузке данных постов или пользователя', error)
            );
    }, []);

    useEffect(() => {
        if (search === undefined) return;
        api.searchPost(search)
            .then((data) => setPosts(data))
            .catch((error) => console.log(error));
    }, [search]);

    const valueContext = {
        posts,
        user,
        setPosts,
        search,
        setSearch,
        activeModal,
        setActiveModal,
    };

    return (
        <div className='App'>
            <Context.Provider value={valueContext}>
                <Header />
                <Main />
                <Modal />
                <Footer />
            </Context.Provider>
        </div>
    );
}

export default App;
