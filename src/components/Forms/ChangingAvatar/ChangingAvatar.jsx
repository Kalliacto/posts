import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import '../inputPost.css';
import { Context } from '../../../context/Context';
import { api } from '../../../api/api';
import { avatarOptions } from '../formsOptions';

const ChangingAvatar = ({ setUserInfo, previewAvatar, setPreviewAvatar }) => {
    const { setActiveModal } = useContext(Context);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ mode: 'onChange' });

    const sendEditDataAvatarInfo = (newAvatar) => {
        return api
            .changingAvatarInfo(newAvatar)
            .then((userInfo) => {
                setActiveModal('');
                reset();
                setUserInfo({ ...userInfo });
            })
            .catch((error) => console.log(error));
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
                    onError={(e) =>
                        (e.currentTarget.src =
                            'https://jkfenner.com/wp-content/uploads/2019/11/default.jpg')
                    }
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
