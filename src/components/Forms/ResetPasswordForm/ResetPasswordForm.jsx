import React, { useContext } from 'react';
import '../inputPost.css';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { tokenOptions, passwordOptions } from '../formsOptions';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import { Context } from '../../../context/Context';
import { userApi } from '../../../api/userApi';

const ResetPasswordForm = () => {
    const { showPassword, setShowPassword } = useContext(Context);
    const navigate = useNavigate();
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onSubmit' });

    const resetPassword = (data) => {
        userApi.setNewPassword(data).then((res) => {
            if (!!res.err) {
                alert(`${res.message}`);
            } else {
                alert(`Добро пожаловать, ${res.data.name}`);
                navigate('/');
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
                <div className='inputPost__input-wrapper'>
                    <input
                        className={errors.password ? 'inputPost__input error' : 'inputPost__input'}
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', passwordOptions)}
                        placeholder='Пароль'
                        autoComplete='true'
                    />
                    <span className='inputPost__eye' onClick={() => setShowPassword((s) => !s)}>
                        {showPassword ? <EyeFill /> : <EyeSlashFill />}
                    </span>
                </div>
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
