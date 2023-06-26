import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../inputPost.css';
import { avatarOptions } from '../formsOptions';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../store/slices/userSlice';
import defaultImage from '../../../images/defaultImage.jpg';
import { activeModal } from '../../../store/slices/postsSlice';

const ChangingAvatar = ({ userInfo }) => {
    const [previewAvatar, setPreviewAvatar] = useState(userInfo.avatar);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ mode: 'onChange' });

    const sendEditDataAvatarInfo = (newAvatar) => {
        dispatch(updateUser(newAvatar)).then(() => {
            dispatch(activeModal(''));
            reset();
        });
    };

    return (
        <form className='inputPost__wrapper' onSubmit={handleSubmit(sendEditDataAvatarInfo)}>
            <h4 className='inputPost__title'>Мой аватар</h4>
            <input
                type='text'
                {...register('avatar', avatarOptions)}
                className={errors.avatar ? 'inputPost__input error' : 'inputPost__input'}
                placeholder='Новое изображение'
                onChange={(e) => setPreviewAvatar(e.target.value)}
            />
            {errors.avatar && <span className='error__message'>{errors.avatar.message}</span>}
            <div className='inputPost__preview_wrap'>
                <img
                    className='inputPost__preview'
                    src={previewAvatar}
                    onError={(e) => (e.currentTarget.src = defaultImage)}
                    alt='avatar'
                />
            </div>
            <button type='submit' className='inputPost__btn'>
                Сохранить изменения аватара
            </button>
        </form>
    );
};

export default ChangingAvatar;
