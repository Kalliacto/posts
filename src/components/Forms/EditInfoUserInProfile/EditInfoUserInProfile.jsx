import React from 'react';
import { api } from '../../../api/api';
import '../inputPost.css';
import { useForm } from 'react-hook-form';
import { aboutOptions, nameOptions } from '../forsmOptions';

const EditInfoUserInProfile = ({ userInfo, setUserInfo, setActiveModal }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        defaultValues: { name: userInfo.name, about: userInfo.about },
    });

    const sendNewUserInfo = (data) => {
        return api
            .changingProfileInfo(data)
            .then((userData) => {
                setUserInfo(userData);
                setActiveModal('');
            })
            .catch((error) => console.log(error));
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
