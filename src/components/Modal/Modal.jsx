import React from 'react';
import './modal.css';
import { XLg } from 'react-bootstrap-icons';

const Modal = ({ children, state, setState }) => {
    return (
        <div className={state ? 'modal modal_active' : 'modal'}>
            <div className='modal__content'>
                <button
                    className='close__modal'
                    onClick={() => {
                        setState(false);
                    }}
                >
                    <XLg width='24' height='24' />
                </button>
                <div className='modal__form_content'>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
