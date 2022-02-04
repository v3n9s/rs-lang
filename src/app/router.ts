import { HashPath, IPageComponent } from './types';
import { notFoundPage } from './view/not-found';
import {
  aboutTeamPage,
  audioCallPage,
  bookPage,
  homePage,
  sprintPage,
  statsPage,
} from './view/view-pages';

interface IHashPathComponent {
  hashPath: string;
  component: IPageComponent;
}

const routes: Array<IHashPathComponent> = [
  { hashPath: HashPath.homePage, component: homePage },
  { hashPath: HashPath.bookPage, component: bookPage },
  { hashPath: HashPath.audioCallPage, component: audioCallPage },
  { hashPath: HashPath.sprintPage, component: sprintPage },
  { hashPath: HashPath.statsPage, component: statsPage },
  { hashPath: HashPath.aboutTeamPage, component: aboutTeamPage },
];

function parseHashLocation(): string {
  const hashPath = location.hash.toLowerCase() || '/';
  return hashPath;
}

function findComponentByPath(
  hashPath: string,
  routesArr: Array<IHashPathComponent>,
): IHashPathComponent | null {
  if (hashPath === '/' || hashPath === '#/') {
    return routes[0];
  }
  const component =
    routesArr.find((item) => item.hashPath.match(new RegExp(`^\\${hashPath}$`, 'i'))) ?? null;
  return component;
}

export function router() {
  const hashPath = parseHashLocation();

  const { component = notFoundPage } = findComponentByPath(hashPath, routes) ?? {};

  const appContainer = document.querySelector('#app') as HTMLDivElement;
  appContainer.innerHTML = component.render();
}
