import React from 'react';
import './header.css';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../store/slices/userSlice';

const Header = () => {
    const dispatch = useDispatch();
    const { user, isAuth } = useSelector((s) => s.user);

    const logOut = () => {
        localStorage.removeItem('postsToken2023');
        dispatch(setAuth(false));
    };

    return (
        <header className='header'>
            <div className='container'>
                <div className='header__wrapper'>
                    <Link to={'/'}>
                        <Logo className='header__logo' />
                    </Link>
                    <Search />
                    <div className='header__btns'>
                        <Link to={`/profile/${user?._id}`}>
                            <button className='button__profile'>Профиль</button>
                        </Link>
                        {isAuth ? (
                            <Link to='login'>
                                <button onClick={logOut} className='button__profile'>
                                    Выйти
                                </button>
                            </Link>
                        ) : (
                            <Link to='login'>
                                <button className='button__profile'>Войти</button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
