import React, { useEffect, useState } from 'react';
import './App.css';
import { Context } from './context/Context';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { api } from './api/api';

function App() {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState(undefined);
    const [activeModal, setActiveModal] = useState(false);
    const [previewImage, setPreviewImage] = useState(
        'https://jkfenner.com/wp-content/uploads/2019/11/default.jpg'
    );
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
        setUser,
        setPosts,
        search,
        setSearch,
        activeModal,
        setActiveModal,
        previewImage,
        setPreviewImage,
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
