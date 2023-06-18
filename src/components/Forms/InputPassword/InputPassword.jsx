import React, { useState } from 'react';
import '../inputPost.css';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import { passwordOptions } from '../formsOptions';

const InputPassword = ({errors, register}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
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
    );
};

export default InputPassword;
