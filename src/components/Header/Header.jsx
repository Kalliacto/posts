import React, { useContext } from 'react';
import './header.css';
import ButtonAddPost from '../BattonAddPost/ButtonAddPost';
import Logo from '../Logo/Logo';
import { Link, useLocation } from 'react-router-dom';
import Search from '../Search/Search';
import { Context } from '../../context/Context';

const Header = () => {
    const { setSearch } = useContext(Context);

    const setSearchQuery = (path) => {
        setSearch(path);
    };

    const location = useLocation();

    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <Link to={'/'}>
                        <Logo className="header__logo" />
                    </Link>
                    <Search setSearch={setSearchQuery} />
                    <ButtonAddPost title={'Изменить профиль'} />
                </div>
            </div>
        </header>
    );
};

export default Header;
