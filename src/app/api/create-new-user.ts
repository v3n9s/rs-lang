export const createUser = async (user: {name: string, email: string, password: string}): Promise<string> => {
    const rawResponse = await fetch('https://rs-school-learnwords.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    
    if (rawResponse.status ===  422) {
      throw new Error('Неправильный email или пароль');
    } else if (rawResponse.status === 200) {
      return 'Регистрация прошла успешно!'; 
    }
    throw new Error ('Unknown Error!');
  };