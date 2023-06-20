import React from 'react';
import '../inputPost.css';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { tokenOptions } from '../formsOptions';
import { useDispatch } from 'react-redux';
import { sendNewPassword } from '../../../store/slices/userSlice';
import InputPassword from '../InputPassword/InputPassword';

const ResetPasswordForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onSubmit' });

    const resetPassword = (data) => {
        dispatch(sendNewPassword(data)).then((res) => {
            if (res.type.endsWith('fulfilled')) {
                navigate('/login');
                reset();
            }
        });
    };
    
    return (
        <div className='inputPost__wrapper'>
            <h3>Восстановление пароля</h3>
            <form className='authForm' onSubmit={handleSubmit(resetPassword)}>
                <input
                    className={errors.token ? 'inputPost__input error' : 'inputPost__input'}
                    type='text'
                    {...register('token', tokenOptions)}
                    placeholder='Токен из письма'
                />
                <InputPassword register={register} errors={errors} />
                {errors.token && <span className='error__message'>{errors.token.message}</span>}
                {errors.password && (
                    <span className='error__message'>{errors.password.message}</span>
                )}
                <button className='inputPost__btn' type='submit'>
                    Обновить пароль
                </button>
                <Link to='/logIn'>
                    <button className='inputPost__btn-link' type='submit'>
                        Я вспомнил пароль
                    </button>
                </Link>
            </form>
        </div>
    );
};

export default ResetPasswordForm;
