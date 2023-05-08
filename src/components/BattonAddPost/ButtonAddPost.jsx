import React, { useContext } from 'react';
import './buttonaddpost.css';
import { Context } from '../../context/Context';

const ButtonAddPost = ({ ...props }) => {
    const { title } = props;
    const { setActiveModal } = useContext(Context);
    return (
        <>
            <button
                className="button__add"
                onClick={() => {
                    console.log('есть контакт!');
                    setActiveModal(true);
                }}
            >
                {title}
            </button>
        </>
    );
};

export default ButtonAddPost;
