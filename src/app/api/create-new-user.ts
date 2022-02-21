import { ICustomResponse } from './sign-in';

export const createUser = async (user: {
  name: string;
  email: string;
  password: string;
}): Promise<ICustomResponse> => {
  const res = await fetch('https://rs-school-learnwords.herokuapp.com/users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  switch (res.status) {
    case 200:
      return {
        status: res.status,
        message: 'Вы успешно зарегистрировались!',
        payload: null,
      };
    case 422:
      return {
        status: res.status,
        message: 'Неправильный email или пароль',
        payload: null,
      };
    case 417:
      return {
        status: res.status,
        message: 'Данный email уже зарегистрирован',
        payload: null,
      };
    default:
      return {
        status: 0,
        message: 'Неизвестная ошибка',
        payload: null,
      };
  }
};
