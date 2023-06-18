import React, { useState } from 'react';
import '../inputPost.css';
import { useForm } from 'react-hook-form';
import { splitTags } from '../../../utils/utils';
import { imageOptions, textOptions, titleOptions } from '../formsOptions';
import defaultImage from '../../../images/defaultImage.jpg';
import { sendNewPostInfo } from '../../../store/slices/postsSlice';
import { useDispatch } from 'react-redux';

const AddPostForm = ({ setActiveModal }) => {
    const dispatch = useDispatch();
    const [previewPostImage, setPreviewPostImage] = useState(defaultImage);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ mode: 'onChange' });

    const sendPost = (postInfo) => {
        dispatch(sendNewPostInfo({ ...postInfo, tags: splitTags(postInfo.tags) })).then(() => {
            setActiveModal('');
            reset();
        });
    };

    return (
        <form onSubmit={handleSubmit(sendPost)} className='inputPost__wrapper'>
            <input
                type='text'
                {...register('title', titleOptions)}
                className={errors.title ? 'inputPost__input error' : 'inputPost__input'}
                placeholder='Заголовок поста'
            />
            {errors.title && <span className='error__message'>{errors.title.message}</span>}
            <textarea
                type='text'
                {...register('text', textOptions)}
                className={errors.text ? 'inputPost__input error' : 'inputPost__input'}
                placeholder='Текст поста'
                rows={1}
            />
            {errors.text && <span className='error__message'>{errors.text.message}</span>}
            <input
                type='text'
                {...register('image', imageOptions)}
                className={errors.image ? 'inputPost__input error' : 'inputPost__input'}
                placeholder='Изображение'
                onChange={(e) => setPreviewPostImage(e.target.value)}
            />
            {errors.image && <span className='error__message'>{errors.image.message}</span>}
            <div className='inputPost__preview_wrap'>
                <img
                    className='inputPost__preview'
                    src={previewPostImage}
                    onError={(e) => (e.currentTarget.src = { defaultImage })}
                    alt='preview'
                />
            </div>
            <input
                type='text'
                {...register('tags')}
                className='inputPost__input'
                placeholder='Тэги через запятую'
            />
            <button type='submit' className='inputPost__btn'>
                Создать новый пост
            </button>
        </form>
    );
};

export default AddPostForm;
