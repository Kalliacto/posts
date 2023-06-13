import React, { useContext } from 'react';
import './header.css';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import { Context } from '../../context/Context';
import { useSelector } from 'react-redux';

const Header = () => {
    const { setSearch, auth, setAuth } = useContext(Context);
    const { user } = useSelector((s) => s.user);

    const setSearchQuery = (path) => {
        setSearch(path);
    };

    return (
        <header className='header'>
            <div className='container'>
                <div className='header__wrapper'>
                    <Link to={'/'}>
                        <Logo className='header__logo' />
                    </Link>
                    <Search setSearch={setSearchQuery} />
                    <div className='header__btns'>
                        <Link to={`/profile/${user._id}`}>
                            <button className='button__profile'>Профиль</button>
                        </Link>
                        {auth ? (
                            <Link to='login'>
                                <button onClick={() => setAuth(false)} className='button__profile'>
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
