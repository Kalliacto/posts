import React from 'react';
import './header.css';
import ButtonAddPost from '../BattonAddPost/ButtonAddPost';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <div className="logo__wrapper">
                        <Link to={'/'}>
                            <Logo className="header__logo" />
                        </Link>
                    </div>
                    <div>I am Search</div>
                    <ButtonAddPost title={'Изменить профиль'} />
                </div>
            </div>
        </header>
    );
};

export default Header;
