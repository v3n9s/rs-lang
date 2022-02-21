export interface ILoginedUser {
  message: string | null;
  token: string | null;
  refreshToken: string | null;
  userId: string | null;
  name: string | null;
}

export interface ICustomResponse {
  status: number;
  message: string;
  payload: ILoginedUser | null;
}

export const loginUser = async (user: {
  email: string;
  password: string;
}): Promise<ICustomResponse> => {
  const res = await fetch('https://rs-school-learnwords.herokuapp.com/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  switch (res.status) {
    case 403:
      return {
        status: res.status,
        message: 'Неправильный email или пароль',
        payload: null,
      };
    case 200:
      return {
        status: res.status,
        message: 'Вы успешно вошли в аккаунт!',
        payload: (await res.json()) as ILoginedUser,
      };
    default:
      return {
        status: 0,
        message: 'Неизвестная ошибка',
        payload: null,
      };
  }
};
