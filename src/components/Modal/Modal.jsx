import React from 'react';
import './modal.css';
import { XLg } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { activeModal } from '../../store/slices/postsSlice';

const Modal = ({ children }) => {
    const dispatch = useDispatch();

    return (
        <div className='modal'>
            <div className='modal__content'>
                <button className='close__modal' onClick={() => dispatch(activeModal(''))}>
                    <XLg width='24' height='24' />
                </button>
                <div className='modal__form_content'>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
