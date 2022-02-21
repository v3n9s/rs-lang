import { getAudioCallPage } from './pages/game-audio-call';
import { getSprintPage } from './pages/game-sprint';
import { BookParam, HashPath, IBookNav } from './types';
import { getAboutTeamPage } from './pages/about-team';
import { getBookPage } from './pages/book';
import { getHomePage } from './pages/home';
import { getNotFoundPage } from './pages/not-found';
import { getStatsPage } from './pages/stats';
import {
  DIFFICULT_GROUP_INDEX,
  MAX_GROUP_INDEX,
  MAX_PAGE_INDEX,
  NOT_SET,
  SITE_ORIGIN,
} from './const';
import { addACGameKeyboardAction } from './pages/game-audio-call/keyboad-control';
import { store } from './redux/store';
import { getNewToken } from './api/users';

export type TPageComponent = (params: IBookNav) => void;

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
  { hashPath: HashPath.audioCallPage, componentFunc: getAudioCallPage, hasParams: true },
  { hashPath: HashPath.sprintPage, componentFunc: getSprintPage, hasParams: true },
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
  const url = new URL(SITE_ORIGIN);
  url.search = params;

  if (params === '') {
    return true;
  }

  const group = url.searchParams.get(BookParam.Group);
  const page = url.searchParams.get(BookParam.Page);

  if (group && page) {
    const groupIndex = +group;
    const pageIndex = +page;

    if (Number.isInteger(groupIndex) && Number.isInteger(pageIndex)) {
      if (
        groupIndex >= 0 &&
        groupIndex <= MAX_GROUP_INDEX &&
        pageIndex >= 0 &&
        pageIndex <= MAX_PAGE_INDEX
      ) {
        return true;
      }
      if (groupIndex === DIFFICULT_GROUP_INDEX && pageIndex === 0) {
        const userId = store.getState().user.userId;
        if (userId) {
          return true;
        }
      }
    }
  }
  return false;
}

export function parseValidParams(params: string): IBookNav {
  if (params === '') {
    return {
      group: NOT_SET,
      page: NOT_SET,
    };
  }
  const url = new URL(SITE_ORIGIN);
  url.search = params;
  const group = Number(url.searchParams.get(BookParam.Group) as string);
  const page = Number(url.searchParams.get(BookParam.Page) as string);
  return {
    group,
    page,
  };
}

const defaultBookLocation: IBookNav = { group: NOT_SET, page: NOT_SET };

async function checkToken(time: number): Promise<void> {
  const savedTime = store.getState().tokenTime.value;
  const isExpireToken = Date.now() - savedTime > time;
  if (isExpireToken) {
    await getNewToken();
  }
}

export function router(): void {
  const userId = store.getState().user.userId;
  if (userId) {
    const refreshTime = 1000 * 60 * 30;
    checkToken(refreshTime);
  }

  const { hashPath, searchParams } = parseLocation(location);
  const hashPathComponent = findComponentByPath(hashPath, routes);

  if (hashPathComponent) {
    addACGameKeyboardAction(false);

    if (hashPathComponent.hasParams && isValidParams(searchParams)) {
      hashPathComponent.componentFunc(parseValidParams(searchParams));
    } else {
      if (searchParams) {
        getNotFoundPage(defaultBookLocation);
      } else {
        hashPathComponent.componentFunc(defaultBookLocation);
      }
    }
  } else {
    getNotFoundPage(defaultBookLocation);
  }
}
