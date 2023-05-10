import React from 'react';
import svg from './NotFound.svg';
import './notfoundpage.css';
import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';

const NotFoundPage = ({ title }) => {
    return (
        <>
            <div className="notFoundPage__wrapper">
                <img className="notFoundPage__img" src={svg} alt="sad smile" />
                <h2 className="notFoundPage__title">{title}</h2>
                <GoBackBtn />
            </div>
        </>
    );
};

export default NotFoundPage;
