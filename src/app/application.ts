import { router } from './router';

class Application {
  init(): void {
    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);
  }
}

export const app = new Application();
