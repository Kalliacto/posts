import React from 'react';
import './header.css';
import ButtonAddPost from '../BattonAddPost/ButtonAddPost';

const Header = (props) => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <div>I am Logo</div>
                    <div>I am Search</div>
                    <ButtonAddPost title={'Изменить профиль'} />
                </div>
            </div>
        </header>
    );
};

export default Header;
