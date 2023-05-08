import React from 'react';
import './buttonaddpost.css';

const ButtonAddPost = ({ ...props }) => {
    const { title, addModal } = props;

    return (
        <>
            <button
                className="button__add"
                onClick={() => {
                    console.log('есть контакт!');
                    addModal();
                }}
            >
                {title}
            </button>
        </>
    );
};

export default ButtonAddPost;
