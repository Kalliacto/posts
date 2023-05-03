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

    const valueContext = { posts };
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
