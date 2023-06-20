import React from 'react';
import '../inputPost.css';
import { useForm } from 'react-hook-form';
import { aboutOptions, nameOptions } from '../formsOptions';
import { updateUser } from '../../../store/slices/userSlice';
import { useDispatch } from 'react-redux';

const EditInfoUserInProfile = ({ userInfo, setActiveModal }) => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        defaultValues: { name: userInfo.name, about: userInfo.about },
    });

    const sendNewUserInfo = (data) => {
        dispatch(updateUser(data)).then(() => {
            setActiveModal('');
        });
    };

    return (
        <form className='editUserForm' onSubmit={handleSubmit(sendNewUserInfo)}>
            <h2>Имя:</h2>
            <input
                type='text'
                {...register('name', nameOptions)}
                placeholder='Имя'
                className={errors.name ? 'inputPost__input error' : 'inputPost__input'}
            />
            {errors.name && <span className='error__message'>{errors.name.message}</span>}
            <h2>О себе:</h2>
            <input
                type='text'
                {...register('about', aboutOptions)}
                className={errors.about ? 'inputPost__input error' : 'inputPost__input'}
                placeholder='Обо мне несколько слов'
            />
            {errors.about && <span className='error__message'>{errors.about.message}</span>}
            <button type='submit' className='inputPost__btn'>
                Сохранить изменения
            </button>
        </form>
    );
};

export default EditInfoUserInProfile;
