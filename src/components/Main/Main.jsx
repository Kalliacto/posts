import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './main.css';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import PostsPage from '../../pages/PostsPage/PostsPage';
import PostPageView from '../../pages/PostPageView/PostPageView';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';

const Main = () => {
    return (
        <main className='main'>
            <div className='container'>
                <Routes>
                    <Route index element={<PostsPage />}></Route>
                    <Route path='/post/:id' element={<PostPageView />}></Route>
                    <Route path='/profile/:userId' element={<ProfilePage />}></Route>
                    <Route
                        path='*'
                        element={<NotFoundPage title={'Простите, данная страница не найдена.'} />}
                    ></Route>
                </Routes>
            </div>
        </main>
    );
};

export default Main;
