import React from 'react';
import './buttonaddpost.css';

const ButtonAddPost = ({ title, onClick }) => {
    return (
        <button className='button__add' onClick={() => onClick()}>
            {title}
        </button>
    );
};

export default ButtonAddPost;
