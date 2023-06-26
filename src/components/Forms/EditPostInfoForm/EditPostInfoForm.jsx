import React, { useState } from 'react';
import '../inputPost.css';
import { useForm } from 'react-hook-form';
import { imageOptions, textOptions, titleOptions } from '../formsOptions';
import { splitTags } from '../../../utils/utils';
import { useDispatch } from 'react-redux';
import { sendUpdatedPostInfo } from '../../../store/slices/onePostSlice';
import defaultImage from '../../../images/defaultImage.jpg';
import { activeModal } from '../../../store/slices/postsSlice';

const EditPostInfoForm = ({ editablePost }) => {
    const dispatch = useDispatch();
    const [previewPostImage, setPreviewPostImage] = useState(editablePost.image);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            title: editablePost.title,
            text: editablePost.text,
            image: editablePost.image,
            tags: editablePost.tags.join(','),
        },
    });

    const submitСhanges = (post) => {
        dispatch(
            sendUpdatedPostInfo({ editablePost, post: { ...post, tags: splitTags(post.tags) } })
        ).then(() => {
            dispatch(activeModal(''));
        });
    };

    return (
        <form onSubmit={handleSubmit(submitСhanges)} className='inputPost__wrapper'>
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
                rows={5}
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
                    onError={(e) => (e.currentTarget.src = defaultImage)}
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
                Сохранить изменения
            </button>
        </form>
    );
};

export default EditPostInfoForm;
