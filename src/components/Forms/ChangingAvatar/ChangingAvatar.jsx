import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../inputPost.css';
import { Context } from '../../../context/Context';
import { api } from '../../../api/api';

const ChangingAvatar = (props) => {
    const { register, handleSubmit, reset } = useForm({});
    const { setUser, user } = useContext(Context);
    const [previewFile, setPreviewFile] = useState('');

    useEffect(() => {
        setPreviewFile(user.avatar);
    }, [user.avatar]);

    const sendEditDataAvatarInfo = async (avatar) => {
        // return await api
        //     .changingAvatar(avatar)
        //     .then((info) => {
        //         console.log({ info });
        //         setUser((state) => [info, ...state]);
        //     })
        //     .then(reset())
        //     .catch((error) => console.log(error));
        console.log('есть контакт');
    };

    const onPreviewFile = (e) => {
        setPreviewFile(e.target.value);
    };

    return (
        <form className='inputPost__wrapper' onClick={() => handleSubmit(sendEditDataAvatarInfo)}>
            <h4 className='inputPost__title'>Мой аватар</h4>
            <input
                type='text'
                {...register('image')}
                className='inputPost__input'
                placeholder='Новое изображение'
                onChange={onPreviewFile}
            />
            <div className='inputPost__preview_wrap'>
                {previewFile && <img src={previewFile} className='inputPost__preview' />}
            </div>
            <button type='submit' className='inputPost__btn'>
                Сохранить изменения аватара
            </button>
        </form>
    );
};

export default ChangingAvatar;
