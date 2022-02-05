import { getAudioCallPage } from './pages/game-audio-call';
import { getSprintPage } from './pages/game-sprint';
import { HashPath } from './types';
import { getAboutTeamPage } from './pages/about-team';
import { getBookPage } from './pages/book';
import { getHomePage } from './pages/home';
import { getNotFoundPage } from './pages/not-found';
import { getStatsPage } from './pages/stats';

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

const routes: Array<IHashPathComponent> = [
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
  const component =
    routesArr.find((item) => item.hashPath.match(new RegExp(`^\\${hashPath}$`, 'i'))) ?? null;
  return component;
}

export function router(): void {
  const { hashPath, searchParams } = parseLocation(location);
  const hashPathComponent = findComponentByPath(hashPath, routes);

  if (hashPathComponent) {
    if (hashPathComponent.hasParams) {
      hashPathComponent.componentFunc(searchParams);
    } else {
      if (searchParams) {
        getNotFoundPage(location.toString());
      } else {
        hashPathComponent.componentFunc(searchParams);
      }
    }
  } else {
    getNotFoundPage(location.toString());
  }
}
