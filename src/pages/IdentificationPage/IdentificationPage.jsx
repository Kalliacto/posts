import React from 'react';
import './identificationPage.css';
import { XLg } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const IdentificationPage = ({ children }) => {
    const navigate = useNavigate();
    return (
        <div className='identificationPage'>
            <div className='identificationPage__content'>
                <button className='identificationPage__close' onClick={() => navigate('/')}>
                    <XLg width='24' height='24' />
                </button>
                <div className='identificationPage__form_content'>{children}</div>
            </div>
        </div>
    );
};

export default IdentificationPage;
