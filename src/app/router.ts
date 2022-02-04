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
  hasParams: boolean;
}

interface ILocationParams {
  hashPath: string;
  searchParams: string;
}

const routes: Array<IHashPathComponent> = [
  { hashPath: HashPath.homePage, component: homePage, hasParams: false },
  { hashPath: HashPath.bookPage, component: bookPage, hasParams: true },
  { hashPath: HashPath.audioCallPage, component: audioCallPage, hasParams: false },
  { hashPath: HashPath.sprintPage, component: sprintPage, hasParams: false },
  { hashPath: HashPath.statsPage, component: statsPage, hasParams: false },
  { hashPath: HashPath.aboutTeamPage, component: aboutTeamPage, hasParams: false },
];

function hasSearchParams(hash: string): boolean {
  return hash.indexOf('?') !== -1;
}

function getHashPath(hash: string): string {
  if (hasSearchParams(hash)) {
    return hash.slice(0, hash.indexOf('?'));
  }
  return hash;
}

function getSearchParams(hash: string): string {
  if (hasSearchParams(hash)) {
    return hash.slice(hash.indexOf('?'));
  }
  return '';
}

function parseLocation(location: Location): ILocationParams {
  const hash = location.hash.toLowerCase() || '/';

  const hashPath = getHashPath(hash);
  const searchParams = getSearchParams(hash);

  return {
    hashPath,
    searchParams,
  };
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

export function router(): void {
  const appContainer = document.querySelector('#app') as HTMLDivElement;

  const { hashPath, searchParams } = parseLocation(location);
  const hashPathComponent = findComponentByPath(hashPath, routes);

  if (hashPathComponent) {
    if (hashPathComponent.hasParams) {
      appContainer.innerHTML = hashPathComponent.component.render(searchParams);
    } else {
      if (searchParams) {
        appContainer.innerHTML = notFoundPage.render(location.toString());
      } else {
        appContainer.innerHTML = hashPathComponent.component.render(searchParams);
      }
    }
  } else {
    appContainer.innerHTML = notFoundPage.render(location.toString());
  }
}
