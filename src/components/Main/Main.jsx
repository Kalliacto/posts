import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './main.css';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import PostsPage from '../../pages/PostsPage/PostsPage';
import PostPageView from '../../pages/PostPageView/PostPageView';

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
            </Routes>
        </main>
    );
};

export default Main;
