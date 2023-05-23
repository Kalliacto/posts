import React from 'react';
import { api } from '../../../api/api';
import '../inputPost.css';
import { useForm } from 'react-hook-form';

const EditInfoUserInProfile = (props) => {
    const { register, handleSubmit, reset } = useForm({});
    // const { setUser } = useContext(Context);

    const sendEditDataInfoUser = async (data) => {
        // return await api
        //     .changingProfileInfo(data)
        //     .then(reset())
        //     .catch((error) => console.log(error));
        console.log('есть контакт');
    };

    return (
        <form className='inputPost__wrapper' onClick={() => handleSubmit(sendEditDataInfoUser)}>
            <h4>Мои данные</h4>
            <input
                type='text'
                {...register('name')}
                placeholder='Имя'
                className='inputPost__input'
            />
            <input
                type='about'
                {...register('about')}
                className='inputPost__input'
                placeholder='Обо мне несколько слов'
            />
            <button type='submit' className='inputPost__btn'>
                Сохранить изменения
            </button>
        </form>
    );
};

export default EditInfoUserInProfile;
