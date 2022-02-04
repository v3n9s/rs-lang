import { IPageComponent } from './types';
import { notFoundPage } from './view/not-found';
import {
  aboutTeamPage,
  audioCallPage,
  bookPage,
  homePage,
  sprintPage,
  statsPage,
} from './view/view-pages';

interface IPathComponent {
  path: string;
  component: IPageComponent;
}

const routes: Array<IPathComponent> = [
  { path: '/', component: homePage },
  { path: '/book', component: bookPage },
  { path: '/audio-call', component: audioCallPage },
  { path: '/sprint', component: sprintPage },
  { path: '/stats', component: statsPage },
  { path: '/about-team', component: aboutTeamPage },
];

const ErrorComponent = notFoundPage;

function parseLocation(): string {
  const path = location.hash.slice(1).toLowerCase() || '/';
  return path;
}

function findComponentByPath(
  path: string,
  routesArr: Array<IPathComponent>,
): IPathComponent | null {
  const pathComponent =
    routesArr.find((item) => item.path.match(new RegExp(`^\\${path}$`, 'i'))) || null;
  return pathComponent;
}

export function router() {
  const path = parseLocation();

  const { component = ErrorComponent } = findComponentByPath(path, routes) || {};

  const appContainer = document.querySelector('#app') as HTMLDivElement;

  appContainer.innerHTML = component.render();
}

// TODO: Catch 404 error on /some/root
// TODO: Book section has long roots // url interface
