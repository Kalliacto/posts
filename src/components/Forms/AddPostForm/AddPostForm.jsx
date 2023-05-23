import React, { useContext } from 'react';
import '../inputPost.css';
import { useForm } from 'react-hook-form';
import { api } from '../../../api/api';
import { Context } from '../../../context/Context';

const AddPostForm = () => {
    const { register, handleSubmit, reset } = useForm({});
    const { setPosts, setActiveModal } = useContext(Context);

    const sendPost = async (post) => {
        return await api
            .addNewPost(post)
            .then((post) => setPosts((state) => [post, ...state]))
            .then(setActiveModal((state) => !state))
            .then(reset())
            .catch((error) => console.log(error));
    };

    return (
        <form onSubmit={handleSubmit(sendPost)} className='inputPost__wrapper'>
            <input
                type='text'
                {...register('title')}
                className='inputPost__input'
                placeholder='Заголовок поста'
            />
            <textarea
                type='text'
                {...register('text')}
                className='inputPost__input'
                placeholder='Текст поста'
                rows={1}
            />
            <input
                type='text'
                {...register('image')}
                className='inputPost__input'
                placeholder='Изображение'
            />
            {/* <input
                type='text'
                {...register('tags')}
                className='addInputPost__input'
                placeholder='Тэги'
            /> */}
            <button type='submit' className='inputPost__btn'>
                Создать новый пост
            </button>
        </form>
    );
};

export default AddPostForm;
