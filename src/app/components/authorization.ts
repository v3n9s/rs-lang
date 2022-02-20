import { store } from '../redux/store';
import { removeUser, updateUser } from '../redux/user';
import { createUser } from '../api/create-new-user';
import { ILoginedUser, loginUser } from '../api/sign-in';

function showLoader(show: Boolean): void {
  const loader = document.querySelector('.login-loader') as HTMLDivElement;
  if (show) {
    loader.classList.remove('login-loader_hidden');
  } else {
    loader.classList.add('login-loader_hidden');
  }
}

function showMessage(msg: string): void {
  const infoMessage = document.createElement('div');
  infoMessage.className = 'info';
  infoMessage.innerHTML = msg;
  document.body.appendChild(infoMessage);
  setTimeout(() => {
    infoMessage.remove();
  }, 3000);
}

function updateAuthButton(authBtn: HTMLButtonElement): void {
  if (store.getState().user.token) {
    authBtn.classList.add('sign-in-btn_authorized');
    authBtn.innerHTML = `
      <i class="fas fa-sign-out"></i>
      <span class="sign-in-btn__caption">Выйти<span>`;
  } else {
    authBtn.classList.remove('sign-in-btn_authorized');
    authBtn.innerHTML = `
    <i class="fas fa-sign-in"></i>
    <span class="sign-in-btn__caption">Войти<span>`;
  }
}

async function registerFormHandler(form: HTMLFormElement): Promise<void> {
  const email = (form.querySelector('#email') as HTMLInputElement).value;
  const password = (form.querySelector('#password') as HTMLInputElement).value;
  const name = (form.querySelector('#name') as HTMLInputElement).value;

  if (!name || !password || !name) {
    showMessage('Не введены имя, email или пароль.');
  } else {
    try {
      showLoader(true);
      const res = await createUser({ email: email, password: password, name: name });
      showLoader(false);
      switch (res.status) {
        case 200:
          const modal = document.querySelector('#modal-wrapper') as HTMLDivElement;
          modal.remove();
          showMessage(res.message);
          break;
        case 417:
          showMessage(res.message);
          break;
        case 422:
          showMessage(res.message);
          break;
        case 0:
          showMessage(res.message);
          break;
        default:
          showMessage('Неизвестная ошибка');
          break;
      }
    } catch {
      showMessage('Неизвестная ошибка');
    }
  }
}

function openRegisterForm() {
  const form = document.createElement('form');
  form.className = 'mui-form';
  form.id = 'register-form';
  form.innerHTML = `
    <span class="mui-form__close-btn"><i class="fa-regular fa-circle-xmark"></i></span>
    <h2 class="mui-form__caption">Регистрация</h2>
    <p class="mui-form__label-text">Имя:</p>
    <input class="mui-form__input" type="text" id="name" required />
    <p class="mui-form__label-text">Электронная почта:</p>
    <input class="mui-form__input" type="email" id="email" required />
    <p class="mui-form__label-text">Пароль:</p>
    <input class="mui-form__input" type="password" id="password" minlength="8" required />
    <div class="mui-form__inner-container">
      <button class="mui-form__btn" type="button" id="reg-form-btn">Зарегистрироваться</button>
      <div class="login-loader login-loader_hidden"></div>
    </div>`;

  const closeBtn = form.querySelector('.mui-form__close-btn') as HTMLElement;
  closeBtn.addEventListener('click', () => {
    form.remove();
    (document.querySelector('#modal-wrapper') as HTMLDivElement).remove();
  });

  const regBtn = form.querySelector('#reg-form-btn') as HTMLButtonElement;
  regBtn.addEventListener('click', () => {
    registerFormHandler(form);
  });

  return form;
}

async function loginFormHandler(form: HTMLFormElement): Promise<void> {
  const email = (form.querySelector('#email') as HTMLInputElement).value;
  const password = (form.querySelector('#password') as HTMLInputElement).value;

  if (!email || !password) {
    showMessage('Не введён email и/или пароль.');
  } else {
    try {
      showLoader(true);
      const res = await loginUser({ email: email, password: password });
      showLoader(false);
      switch (res.status) {
        case 200:
          store.dispatch(updateUser(res.payload as ILoginedUser));

          const modal = document.querySelector('#modal-wrapper') as HTMLDivElement;
          modal.remove();

          showMessage(res.message);
          const authBtn = document.querySelector('#auth-btn') as HTMLButtonElement;
          updateAuthButton(authBtn);
          location.reload();
          break;
        case 403:
          showMessage(res.message);
          break;
        case 0:
          showMessage(res.message);
          break;
        default:
          showMessage('Неизвестная ошибка');
          break;
      }
    } catch {
      showMessage('Неизвестная ошибка');
    }
  }
}

function openAuthModal(): void {
  const modalWrapper = document.createElement('div');
  modalWrapper.id = 'modal-wrapper';
  modalWrapper.className = 'modal';

  const form = document.createElement('form');
  form.className = 'mui-form';
  form.id = 'auth-form';
  form.innerHTML = `
    <span class="mui-form__close-btn"><i class="fa-regular fa-circle-xmark"></i></span>
    <h2 class="mui-form__caption">Вход</h2>
    <p class="mui-form__label-text">Электронная почта:</p>
    <input class="mui-form__input" type="email" id="email" required />
    <p class="mui-form__label-text">Пароль:</p>
    <input class="mui-form__input" type="password" id="password" minlength="8" required />
    <div class="mui-form__inner-container">
      <button class="mui-form__btn" type="button" id="log-in-btn">Войти</button>
      <div class="login-loader login-loader_hidden"></div>
      <button class="mui-form__btn" type="button" id="open-reg-form-btn">Регистрация</button>
    </div>`;

  const regBtn = form.querySelector('#open-reg-form-btn') as HTMLButtonElement;
  regBtn.addEventListener('click', () => {
    modalWrapper.innerHTML = '';
    modalWrapper.appendChild(openRegisterForm());
  });

  const closeBtn = form.querySelector('.mui-form__close-btn') as HTMLElement;
  closeBtn.addEventListener('click', () => {
    form.remove();
    modalWrapper.remove();
  });

  const signInBtn = form.querySelector('#log-in-btn') as HTMLButtonElement;
  signInBtn.addEventListener('click', () => {
    loginFormHandler(form);
  });

  modalWrapper.appendChild(form);
  document.body.appendChild(modalWrapper);
}

export function authButtonHandler(node: HTMLElement): void {
  const authBtn = node.querySelector('#auth-btn') as HTMLButtonElement;
  updateAuthButton(authBtn);

  authBtn.addEventListener('click', () => {
    if (store.getState().user.token) {
      store.dispatch(removeUser());
      updateAuthButton(authBtn);
      location.reload();
    } else {
      openAuthModal();
    }
  });
}
