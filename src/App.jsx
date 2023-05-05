import React, { useEffect, useState } from 'react';
import './App.css';
import { Context } from './context/Context';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { api } from './api/api';

function App() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        api.getAllPosts().then((data) => setPosts(data));
    }, []);

    const onSortPosts = (sortId) => {
        if (sortId === 'all') {
            const newPosts = posts;
            setPosts([...newPosts]);
            console.log('all');
        }

        if (sortId === 'popular') {
            const newPosts = posts.sort(
                (a, b) => b.likes.length - a.likes.length
            );
            setPosts([...newPosts]);
            console.log('popular');
        }

        if (sortId === 'new') {
            const newPosts = posts.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
            setPosts([...newPosts]);
            console.log('new');
        }

        if (sortId === 'old') {
            const newPosts = posts.sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
            );
            setPosts([...newPosts]);
            console.log('old');
        }
    };

    const valueContext = { posts, onSortPosts };
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
