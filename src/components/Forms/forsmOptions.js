export const titleOptions = {
    required: {
        value: true,
        message: 'Введите заголовок поста',
    },
    maxLength: {
        value: 70,
        message: 'Заголовок слишком длинный',
    },
}

export const textOptions = {
    required: {
        value: true,
        message: 'Введите текст поста',
    },
}

export const imageOptions = {
    required: {
        value: true,
        message: 'Введите URL-адрес вашей картинки',
    },
}

export const avatarOptions = {
    required: {
        value: true,
        message: 'Введите URL-адрес вашего аватара',
    },
}

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