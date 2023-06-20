import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './main.css';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import PostsPage from '../../pages/PostsPage/PostsPage';
import PostPageView from '../../pages/PostPageView/PostPageView';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import AuthorizationForm from '../Forms/AuthorizationForm/AuthorizationForm';
import IdentificationPage from '../../pages/IdentificationPage/IdentificationPage';
import RegistrationForm from '../Forms/RegistrationForm/RegistrationForm';
import ForgotPasswordForm from '../Forms/ForgotPasswordForm/ForgotPasswordForm';
import ResetPasswordForm from '../Forms/ResetPasswordForm/ResetPasswordForm';
import { ToastContainer } from 'react-toastify';

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
                    <Route
                        path='/login'
                        element={
                            <IdentificationPage>
                                <AuthorizationForm />
                            </IdentificationPage>
                        }
                    ></Route>
                    <Route
                        path='/registration'
                        element={
                            <IdentificationPage>
                                <RegistrationForm />
                            </IdentificationPage>
                        }
                    ></Route>
                    <Route
                        path='/forgot-password'
                        element={
                            <IdentificationPage>
                                <ForgotPasswordForm />
                            </IdentificationPage>
                        }
                    ></Route>
                    <Route
                        path='/password-reset'
                        element={
                            <IdentificationPage>
                                <ResetPasswordForm />
                            </IdentificationPage>
                        }
                    />
                </Routes>
                <ToastContainer position='top-right' autoClose={3000} theme='colored' />
            </div>
        </main>
    );
};

export default Main;
