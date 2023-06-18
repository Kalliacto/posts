import React from 'react';
import '../inputPost.css';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { aboutOptions, emailOptions, nameOptions } from '../formsOptions';
import { useDispatch } from 'react-redux';
import { registration } from '../../../store/slices/userSlice';
import InputPassword from '../InputPassword/InputPassword';

const RegistrationForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onSubmit' });

    const sendRegistrationData = (data) => {
        dispatch(registration(data)).then(() => {
            navigate('/');
            reset();
        });
    };

    return (
        <div className='inputPost__wrapper'>
            <h3>Регистрация</h3>
            <form className='authForm' onSubmit={handleSubmit(sendRegistrationData)}>
                <input
                    className={errors.name ? 'inputPost__input error' : 'inputPost__input'}
                    type='text'
                    {...register('name', nameOptions)}
                    placeholder='Имя'
                />
                {errors.name && <span className='error__message'>{errors.name.message}</span>}
                <input
                    className={errors.about ? 'inputPost__input error' : 'inputPost__input'}
                    type='text'
                    {...register('about', aboutOptions)}
                    placeholder='Пара слов о себе'
                />
                {errors.about && <span className='error__message'>{errors.about.message}</span>}
                <input
                    className={errors.email ? 'inputPost__input error' : 'inputPost__input'}
                    type='text'
                    {...register('email', emailOptions)}
                    placeholder='Email'
                />
                {errors.email && <span className='error__message'>{errors.email.message}</span>}
                <InputPassword register={register} errors={errors} />
                {errors.password && (
                    <span className='error__message'>{errors.password.message}</span>
                )}
                <button className='inputPost__btn' type='submit'>
                    Зарегистрироваться
                </button>
                <Link to='/login'>
                    <button className='inputPost__btn-link' type='submit'>
                        У меня уже есть аккаунт
                    </button>
                </Link>
            </form>
        </div>
    );
};

export default RegistrationForm;
