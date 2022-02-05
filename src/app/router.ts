import { audioCallPage } from './view/game-audio-call/view-pages';
import { sprintPage } from './view/game-sprint/view-pages';
import { HashPath, IPageComponent } from './types';
import { aboutTeamPage } from './view/about-team-page/view-pages';
import { bookPage } from './view/book-page/view-pages';
import { homePage } from './view/home-page/view-pages';
import { notFoundPage } from './view/not-found-page/not-found';
import { statsPage } from './view/stats-page/view-pages';

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
  const { hashPath, searchParams } = parseLocation(location);
  const hashPathComponent = findComponentByPath(hashPath, routes);

  if (hashPathComponent) {
    if (hashPathComponent.hasParams) {
      hashPathComponent.component.render(searchParams);
    } else {
      if (searchParams) {
        notFoundPage.render(location.toString());
      } else {
        hashPathComponent.component.render(searchParams);
      }
    }
  } else {
    notFoundPage.render(location.toString());
  }
}
