import React, { useContext } from 'react';
import '../inputPost.css';
import { useForm } from 'react-hook-form';
import { imageOptions, textOptions, titleOptions } from '../forsmOptions';
import { Context } from '../../../context/Context';
import { api } from '../../../api/api';
import { splitTags } from '../../../utils/utils';

const EditPostInfoForm = ({ setActiveModal, editablePost, setPostInfo }) => {
    const { previewPostImage, setPreviewPostImage } = useContext(Context);
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
    const sendNewInfoPost = (post) => {
        api.setNewInfoPost(editablePost._id, { ...post, tags: splitTags(post.tags) }).then(
            (res) => {
                setPostInfo(res);
                setActiveModal('');
            }
        );
    };

    return (
        <form onSubmit={handleSubmit(sendNewInfoPost)} className='inputPost__wrapper'>
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
                    onError={(e) =>
                        (e.currentTarget.src =
                            'https://jkfenner.com/wp-content/uploads/2019/11/default.jpg')
                    }
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
