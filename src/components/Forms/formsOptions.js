export const titleOptions = {
    required: {
        value: true,
        message: 'Введите заголовок поста',
    },
    maxLength: {
        value: 70,
        message: 'Заголовок слишком длинный',
    },
};

export const textOptions = {
    required: {
        value: true,
        message: 'Введите текст поста',
    },
};

export const imageOptions = {
    required: {
        value: true,
        message: 'Введите URL-адрес вашей картинки',
    },
};

export const avatarOptions = {
    required: {
        value: true,
        message: 'Введите URL-адрес вашего аватара',
    },
};

export const nameOptions = {
    required: {
        value: true,
        message: 'Введите имя',
    },
    maxLength: {
        value: 30,
        message: 'Имя слишком длинное',
    },
};

export const aboutOptions = {
    required: {
        value: true,
        message: 'Расскажите о себе в двух словах',
    },
    maxLength: {
        value: 30,
        message: 'Достаточно пары слов',
    },
};

export const emailOptions = {
    required: {
        value: true,
        message: 'Введите email',
    },
    pattern: {
        value: /^([A-Za-z0-9_.])+(@)([A-Za-z0-9_\-.])+([.])([A-Za-z]{2,4})$/,
        message: 'Некорректный  email',
    },
};

export const passwordOptions = {
    required: {
        value: true,
        message: 'Введите пароль!',
    },
    // pattern: {
    //     value: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g,
    //     message:
    //         'Пароль должен быть длиной от 6 символов и включать в себя цифры, спецсимволовы и буквы латинского алфавита в нижнем и верхнем регистре.',
    // },
};

export const tokenOptions = {
    required: {
        value: true,
        message: 'Введите токен из письма',
    },
    minLength: {
        value: 197,
        message: 'Неккоректный токен. Проверьте ещё раз',
    },
};
