import React, { useContext } from 'react';
import './header.css';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import { Context } from '../../context/Context';

const Header = () => {
    const { setSearch, user } = useContext(Context);

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
                    <Link to={`/profile/${user._id}`}>
                        <button className='button__profile'>Профиль</button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
