import React from 'react';
import './buttonaddpost.css';

const ButtonAddPost = (props) => {
    return (
        <>
            <button
                className="button__add"
                onClick={() => {
                    console.log('есть контакт!');
                }}
            >
                Создать новый пост
            </button>
        </>
    );
};

export default ButtonAddPost;
