import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './main.css';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import PostsPage from '../../pages/PostsPage/PostsPage';

const Main = () => {
    return (
        <main className="main">
            <Routes>
                <Route path="/" element={<PostsPage />}></Route>
                {/* <Route
                    path="/:id"
                    element={
                        <div>Тут будет переход на просмотр одного поста</div>
                    }
                ></Route> */}
                <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
        </main>
    );
};

export default Main;
