import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './main.css';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import PostsPage from '../../pages/PostsPage/PostsPage';
import PostPageView from '../../pages/PostPageView/PostPageView';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';

const Main = () => {
    return (
        <main className="main">
            <Routes>
                <Route index element={<PostsPage />}></Route>
                <Route path="/:id" element={<PostPageView />}></Route>
                <Route
                    path="*"
                    element={
                        <NotFoundPage
                            title={'Простите, данная страница не найдена.'}
                        />
                    }
                ></Route>
                <Route path="/profile/:userId" element={<ProfilePage />}></Route>
            </Routes>
        </main>
    );
};

export default Main;
