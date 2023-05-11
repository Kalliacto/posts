import './goBackBtn.css';
import React from 'react';
import { Link } from 'react-router-dom';

const GoBackBtn = () => {
    return (
        <Link to={'/'}>
            <button className="btn__back">{`< Назад`}</button>
        </Link>
    );
};

export default GoBackBtn;
