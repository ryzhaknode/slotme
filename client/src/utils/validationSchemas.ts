import * as yup from 'yup';

const regex = {
  emailRegexp: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
};

export const signUpSchema = yup.object().shape({
  name: yup.string().required('Ім\'я обов\'язкове').min(3, 'Ім\'я має містити мінімум 3 символи'),
  email: yup.string().required('Email обов\'язковий').matches(regex.emailRegexp, 'Невірний email. Приклад: user@mail.com'),
  password: yup.string().required('Пароль обов\'язковий').min(6, 'Пароль має містити мінімум 6 символів'),
});

export const singInSchema = yup.object().shape({
  email: yup.string().required('Email обов\'язковий').matches(regex.emailRegexp, 'Невірний email. Приклад: user@mail.com'),
  password: yup.string().required('Пароль обов\'язковий').min(6, 'Пароль має містити мінімум 6 символів'),
});

export const emailOnlySchema = yup.object().shape({
  email: yup.string().required('Email обов\'язковий').matches(regex.emailRegexp, 'Невірний email. Приклад: user@mail.com'),
});
