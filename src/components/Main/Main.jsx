import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './main.css';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import PostsList from '../../pages/PostsList/PostsList';

const Main = () => {
    return (
        <main className="main">
            <Routes>
                <Route path="/" element={<PostsList />}></Route>
                <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
        </main>
    );
};

export default Main;
