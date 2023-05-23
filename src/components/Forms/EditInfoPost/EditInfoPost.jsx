import React, { useContext } from 'react';
import '../inputPost.css';
import { Context } from '../../../context/Context';
import { useForm } from 'react-hook-form';
import { api } from '../../../api/api';

const EditInfoPost = (props) => {
    const { register, handleSubmit, reset } = useForm({});
    // const { setPosts } = useContext(Context);

    const sendEditDataPost = async (postData) => {
        // id поста добавить
        // return await api
        //     .editInfoPost(post)
        //     .then((post) => setPosts((state) => [post, ...state]))
        //     .then(reset())
        //     .catch((error) => console.log(error));
        console.log('есть контакт');
    };

    return (
        <form onSubmit={handleSubmit(sendEditDataPost)} className='inputPost__wrapper'>
            <input
                type='text'
                {...register('title')}
                className='inputPost__input'
                placeholder='Новый заголовок поста'
            />
            <textarea
                type='text'
                {...register('text')}
                className='inputPost__input'
                placeholder='Новый текст поста'
                rows={1}
            />
            <input
                type='text'
                {...register('image')}
                className='inputPost__input'
                placeholder='Новое изображение'
            />
            {/* <input
                type='text'
                {...register('tags')}
                className='addInputPost__input'
                placeholder='Тэги'
            /> */}
            <button type='submit' className='inputPost__btn'>
                Сохранить изменения
            </button>
        </form>
    );
};

export default EditInfoPost;
