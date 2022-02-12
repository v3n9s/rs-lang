import { getAudioCallPage } from './pages/game-audio-call';
import { getSprintPage } from './pages/game-sprint';
import { BookParam, HashPath, IBookNav } from './types';
import { getAboutTeamPage } from './pages/about-team';
import { getBookPage } from './pages/book';
import { getHomePage } from './pages/home';
import { getNotFoundPage } from './pages/not-found';
import { getStatsPage } from './pages/stats';
import { store } from './redux/store';
import { resetGameInitData, updateGameInitData } from './redux/game-init-data';

export type TPageComponent = (params: string) => void;

interface IHashPathComponent {
  hashPath: string;
  componentFunc: TPageComponent;
  hasParams: boolean;
}

interface ILocationParams {
  hashPath: string;
  searchParams: string;
}

export const routes: Array<IHashPathComponent> = [
  { hashPath: HashPath.homePage, componentFunc: getHomePage, hasParams: false },
  { hashPath: HashPath.bookPage, componentFunc: getBookPage, hasParams: true },
  { hashPath: HashPath.audioCallPage, componentFunc: getAudioCallPage, hasParams: false },
  { hashPath: HashPath.sprintPage, componentFunc: getSprintPage, hasParams: false },
  { hashPath: HashPath.statsPage, componentFunc: getStatsPage, hasParams: false },
  { hashPath: HashPath.aboutTeamPage, componentFunc: getAboutTeamPage, hasParams: false },
];

export function hasSearchParams(hash: string): boolean {
  return hash.indexOf('?') !== -1;
}

export function getHashPath(hash: string): string {
  if (hasSearchParams(hash)) {
    return hash.slice(0, hash.indexOf('?'));
  }
  return hash;
}

export function getSearchParams(hash: string): string {
  if (hasSearchParams(hash)) {
    return hash.slice(hash.indexOf('?'));
  }
  return '';
}

export function parseLocation(location: Location | URL): ILocationParams {
  const hash = location.hash.toLowerCase() || '/';

  const hashPath = getHashPath(hash);
  const searchParams = getSearchParams(hash);

  return {
    hashPath,
    searchParams,
  };
}

export function findComponentByPath(
  hashPath: string,
  routesArr: Array<IHashPathComponent>,
): IHashPathComponent | null {
  if (hashPath === '/' || hashPath === '#/') {
    return routes[0];
  }
  const componentFunc =
    routesArr.find((item) => item.hashPath.match(new RegExp(`^\\${hashPath}$`, 'i'))) ?? null;
  return componentFunc;
}

export function isValidParams(params: string): boolean {
  const url = new URL('http://localhost:5000/');
  url.search = params;

  if (params === '') {
    return true;
  }

  const group = url.searchParams.get(BookParam.Group);
  const page = url.searchParams.get(BookParam.Page);

  if (group && page) {
    const groupNum = +group;
    const pageNum = +page;

    if (Number.isInteger(groupNum) && Number.isInteger(pageNum)) {
      if (groupNum >= 0 && groupNum <= 5 && pageNum >= 0 && pageNum <= 29) {
        return true;
      }
      if (groupNum === 6 && pageNum === 0) {
        return true;
      }
    }
  }
  return false;
}

function parseValidParams(params: string): IBookNav {
  const url = new URL('http://localhost:5000/');
  url.search = params;

  const group = Number(url.searchParams.get(BookParam.Group) as string);
  const page = Number(url.searchParams.get(BookParam.Page) as string);

  return {
    group,
    page,
  };
}

export function router(): void {
  const { hashPath, searchParams } = parseLocation(location);
  const hashPathComponent = findComponentByPath(hashPath, routes);

  if (hashPath !== HashPath.audioCallPage && hashPath !== HashPath.sprintPage) {
    store.dispatch(resetGameInitData());
  }

  if (hashPathComponent) {
    if (hashPathComponent.hasParams && isValidParams(searchParams)) {
      if (searchParams) {
        store.dispatch(updateGameInitData(parseValidParams(searchParams)));
      } else {
        store.dispatch(resetGameInitData());
      }
      hashPathComponent.componentFunc(searchParams);
    } else {
      if (searchParams) {
        getNotFoundPage(searchParams);
      } else {
        hashPathComponent.componentFunc(searchParams);
      }
    }
  } else {
    getNotFoundPage(searchParams);
  }
}
