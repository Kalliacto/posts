import React from 'react';
import svg from './NotFound.svg';
import './notfoundpage.css';
import { Link } from 'react-router-dom';

const NotFoundPage = ({ title }) => {
    return (
        <>
            <div className="container">
                <div className="notFoundPage__wrapper">
                    <img
                        className="notFoundPage__img"
                        src={svg}
                        alt="sad smile"
                    />
                    <h2 className="notFoundPage__title">{title}</h2>
                    <Link to={'/'}>
                        <button className="notFoundPage__btn">
                            На главную
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;
