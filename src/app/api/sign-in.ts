export const loginUser = async (user: {
  email: string;
  password: string;
}): Promise<ILoginedUser> => {
  const rawResponse = await fetch('https://rs-school-learnwords.herokuapp.com/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (rawResponse.status === 403) {
    throw new Error('Неправильный email или пароль');
  } else if (rawResponse.status === 200) {
    const content: ILoginedUser = await rawResponse.json();
    return content;
  }
  throw new Error('Unknown Error!');
};

export interface ILoginedUser {
  message: string | null;
  token: string | null;
  refreshToken: string | null;
  userId: string | null;
  name: string | null;
}
