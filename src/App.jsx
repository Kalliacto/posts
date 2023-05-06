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
    
    useEffect(() => {
        Promise.all([api.getAllPosts(), api.getUserInfo()])
        .then(([postData, userData]) => {
            setPosts(postData);
            setUser(userData);
        }).catch(error => console.error('Ошибка при загрузке данных постов или пользователя', error))
    }, []);

    const valueContext = { posts, user, setPosts };
    return (
        <div className="App">
            <Context.Provider value={valueContext}>
                <Header />
                <Main />
                <Footer />
            </Context.Provider>
        </div>
    );
}

export default App;
