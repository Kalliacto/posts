import React, { useContext } from 'react';
import './addInputPost.css';
import { useForm } from 'react-hook-form';
import { api } from '../../api/api';
import { Context } from '../../context/Context';

const AddInputPost = () => {
    const { register, handleSubmit } = useForm();
    const { setPosts, setActiveModal } = useContext(Context);

    const sendPost = async (post) => {
        return await api
            .addNewPost(post)
            .then((post) => {
                return setPosts((state) => {
                    return [post, ...state];
                });
            })
            .then(setActiveModal((state) => !state))
            .catch((error) => console.log(error));
    };

    return (
        <form onSubmit={handleSubmit(sendPost)} className='addInputPost__wrapper'>
            <input
                type='text'
                {...register('title')}
                className='addInputPost__input'
                placeholder='Заголовок поста'
            />
            <textarea
                type='text'
                {...register('text')}
                className='addInputPost__input'
                placeholder='Текст поста'
                rows={1}
            />
            <input
                type='text'
                {...register('image')}
                className='addInputPost__input'
                placeholder='Изображение'
            />
            {/* <input
                type='text'
                {...register('tags')}
                className='addInputPost__input'
                placeholder='Тэги'
            /> */}
            <button type='submit' className='addInputPost__btn'>
                Создать новый пост
            </button>
        </form>
    );
};

export default AddInputPost;
