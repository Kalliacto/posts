import React from 'react';
import './buttonaddpost.css';

const ButtonAddPost = ({ ...props }) => {
    const { title } = props;
    return (
        <>
            <button
                className="button__add"
                onClick={() => console.log('есть контакт!')}
            >
                {title}
            </button>
        </>
    );
};

export default ButtonAddPost;
