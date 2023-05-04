import './goBackBtn.css';
import React from 'react';
import { Link } from 'react-router-dom';

const GoBackBtn = () => {
    return (
        <Link to={-1}>
            <span className="btn__back">{`> Назад`}</span>
        </Link>
    );
};

export default GoBackBtn;
