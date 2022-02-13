import { store } from '../redux/store';
import { removeUser, updateUser } from '../redux/user';
import { createUser } from '../api/create-new-user';
import { ILoginedUser, loginUser } from '../api/sign-in';

function showMessage(mess: string) {
  const infoMessage = document.createElement('div');
  infoMessage.className = 'info';
  infoMessage.innerHTML = mess;
  document.body.appendChild(infoMessage);
  function removeDiv() {
    document.body.removeChild(infoMessage);
  }
  setTimeout(removeDiv, 2000);
}

async function registerFormHandler(this: HTMLFormElement, event: Event) {
  event.preventDefault();
  const targetElement = event.target as HTMLElement;
  const email = (targetElement.querySelector('#email')! as HTMLInputElement).value;
  const password = (targetElement.querySelector('#password') as HTMLInputElement).value;
  const name = (targetElement.querySelector('#name') as HTMLInputElement).value;
  createUser({ email: email, password: password, name: name })
    .then(() => {
      const modal = document.querySelector('#modal-wrapper') as HTMLDivElement;
      document.body.removeChild(modal);
      showMessage('Регистрация прошла успешно! Пожалуйста войдите в аккаунт!');
      document.location.reload();
    })
    .catch(() => {
      showMessage('Ошибка! Повторите попытку регистрации');
    });
}

function openRegisterForm() {
  const form = document.createElement('form');
  form.className = 'mui-form';
  form.id = 'auth-form';
  form.innerHTML = `
       <h1>Регистрация</h1>
       <form class="mui-form" id="register-form">
       <p>Имя:</p>
       <div class="mui-textfield mui-textfield--float-label">
       
       <input type="text" id="name" required>
       <label for="name">Name</label>
       </div>
       <p>Электронная почта:</p>
       <div class="mui-textfield mui-textfield--float-label">
       
       <input type="email" id="email" required>
       <label for="email">Email</label>
       </div>
       <p>Пароль:</p>
       <div class="mui-textfield mui-textfield--float-label">
      
       <input type="password" id="password" minlength="8" required>
       <label for="password">Пароль</label>
       </div>
       <button type="submit" id="register" class="mui-btn mui-btn--raiswd mui-btn--primary">
       Зарегистрироваться
       </button>
       `;
  form.addEventListener('submit', registerFormHandler, { once: true });
  return form;
}

async function loginFormHandler(this: HTMLFormElement, event: Event) {
  event.preventDefault();
  const targetElement = event.target as HTMLElement;
  const email = (targetElement.querySelector('#email')! as HTMLInputElement).value;
  const password = (targetElement.querySelector('#password') as HTMLInputElement).value;

  loginUser({ email: email, password: password })
    .then((user: ILoginedUser) => {
      const modal = document.querySelector('#modal-wrapper') as HTMLDivElement;
      document.body.removeChild(modal);
      showMessage('Вы успешно вошли в аккаунт!');
      store.dispatch(updateUser(user));
      document.location.reload();
    })
    .catch(() => {
      showMessage('Ошибка! Неправильный пароль или имя пользователя!');
    });
}

function openAuthModal(modalWrapper: HTMLDivElement) {
  const register = document.createElement('button');
  register.innerHTML = 'Регистрация';
  register.id = 'register';
  register.classList.add('mui-btn', 'mui-btn--raiswd', 'mui-btn--primary');
  register.addEventListener('click', () => {
    modalWrapper.innerHTML = '';
    modalWrapper.appendChild(openRegisterForm());
  });

  const form = document.createElement('form');
  form.className = 'mui-form';
  form.id = 'auth-form';
  form.innerHTML = `
      <span class="close">&times;</span>
      <h1>Вход в аккаунт</h1>
      <p>Электронная почта:</p>
      <div class="mui-textfield mui-textfield--float-label">
      
      <input type="email" id="email" required>
      <label for="email">Email</label>
      </div>
      <p>Пароль:</p>
      <div class="mui-textfield mui-textfield--float-label">
      
      <input type="password" id="password" minlength="8" required>
      <label for="password">Пароль</label>
      </div>
      <button type="submit" class="mui-btn mui-btn--raiswd mui-btn--primary">
      Войти
      </button>   
      `;
  form.appendChild(register);
  modalWrapper.appendChild(form);
  document.body.appendChild(modalWrapper);
  const close = modalWrapper.getElementsByClassName('close')[0];
  close.addEventListener('click', () => document.body.removeChild(modalWrapper));
  window.onclick = function (event) {
    if (event.target == modalWrapper) {
      document.body.removeChild(modalWrapper);
    }
  };
  form.addEventListener('submit', loginFormHandler, { once: true });
}

export function createAuthButton(rootElement: HTMLElement) {
  const modalWrapper = document.createElement('div');
  modalWrapper.id = 'modal-wrapper';
  modalWrapper.className = 'modal';

  const buttonAuth = rootElement.querySelector('#auth-btn')!;
  if (store.getState().user.token !== null) {
    buttonAuth.id = 'logout';
    buttonAuth.innerHTML = `
      <i class="fa-solid fa-right-to-bracket"></i>
      <span>Выйти<span>`;
    buttonAuth.addEventListener('click', () => {
      store.dispatch(removeUser());
      document.location.reload();
    });
  } else if (store.getState().user.token === null) {
    buttonAuth.id = 'login';
    buttonAuth.innerHTML = `
      <i class="fa-solid fa-right-to-bracket"></i>
      <span>Войти<span>`;
    buttonAuth.addEventListener('click', () => openAuthModal(modalWrapper));
  }
}
