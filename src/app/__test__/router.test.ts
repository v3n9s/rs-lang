import { SITE_ORIGIN } from '../const';
import {
  findComponentByPath,
  getHashPath,
  getSearchParams,
  hasSearchParams,
  parseLocation,
  routes,
} from '../router';
import { HashPath } from '../types';

describe('Test "hasSearchParams" function', () => {
  test("Str 'some-root' should be equal to 'false'", () => {
    expect(hasSearchParams('some-root')).toBe(false);
  });

  test("Str 'some-root#$!@$%* ._qwe' should be equal to 'false'", () => {
    expect(hasSearchParams('some-root#$!@$%* ._qwe')).toBe(false);
  });

  test("Str 'some-root?' should be equal to 'true'", () => {
    expect(hasSearchParams('some-root?')).toBe(true);
  });

  test("Str 'some-root?this-param???yes' should be equal to 'some-root'", () => {
    expect(hasSearchParams('some-root?this-param???yes')).toBe(true);
  });
});

describe('Test "getHashPath" function', () => {
  test("Str 'some-root' should be equal to 'some-root'", () => {
    expect(getHashPath('some-root')).toBe('some-root');
  });

  test("Str 'some-root?' should be equal to 'some-root'", () => {
    expect(getHashPath('some-root?')).toBe('some-root');
  });

  test("Str 'some-root?cat=1&qwert' should be equal to 'some-root'", () => {
    expect(getHashPath('some-root?cat=1&qwert')).toBe('some-root');
  });

  test("Str 'some?root?cat=1&qwert' should be equal to 'some'", () => {
    expect(getHashPath('some?root?cat=1&qwert')).toBe('some');
  });
});

describe('Test "getSearchParams" function', () => {
  test("Str 'some-root' should be equal to '' ", () => {
    expect(getSearchParams('some-root')).toBe('');
  });

  test("Str 'some-root?' should be equal to '?' ", () => {
    expect(getSearchParams('some-root?')).toBe('?');
  });

  test("Str 'some-root?cat=1&qwert' should be equal to '?cat=1&qwert'", () => {
    expect(getSearchParams('some-root?cat=1&qwert')).toBe('?cat=1&qwert');
  });

  test("Str 'some?root?cat=1&qwert' should be equal to '?root?cat=1&qwert'", () => {
    expect(getSearchParams('some?root?cat=1&qwert')).toBe('?root?cat=1&qwert');
  });

  test("Str 'some#.$%!=/root?cat=1&qwert' should be equal to '?cat=1&qwert'", () => {
    expect(getSearchParams('some#.$%!=/root?cat=1&qwert')).toBe('?cat=1&qwert');
  });
});

describe('Test "parseLocation" function', () => {
  const loc = new URL(`${SITE_ORIGIN}#/home`);

  let result = {
    hashPath: '#/home',
    searchParams: '',
  };
  test(`Location '${loc.href}' should be equal to ${JSON.stringify(result)}`, () => {
    expect(parseLocation(loc)).toEqual(result);
  });

  loc.hash = '#/some?cat=123&page=22';
  result = {
    hashPath: '#/some',
    searchParams: '?cat=123&page=22',
  };
  test(`Location '${loc.href}' should be equal to ${JSON.stringify(result)}`, () => {
    expect(parseLocation(loc)).toEqual(result);
  });
});

describe('Test "findComponentByPath" function', () => {
  test('Case Case 0', () => {
    expect(findComponentByPath(HashPath.homePage, routes)).toEqual(routes[0]);
  });

  test('Case 1', () => {
    expect(findComponentByPath('/', routes)).toEqual(routes[0]);
  });

  test('Case 2', () => {
    expect(findComponentByPath('#/', routes)).toEqual(routes[0]);
  });

  test('Case 3', () => {
    expect(findComponentByPath(HashPath.bookPage, routes)).toEqual(routes[1]);
  });

  test('Case 4', () => {
    expect(findComponentByPath(`${HashPath.bookPage}?cat=4&page=2`, routes)).toEqual(null);
  });

  test('Case 5', () => {
    expect(findComponentByPath(HashPath.audioCallPage, routes)).toEqual(routes[2]);
  });

  test('Case 6', () => {
    expect(findComponentByPath(HashPath.sprintPage, routes)).toEqual(routes[3]);
  });

  test('Case 7', () => {
    expect(findComponentByPath(HashPath.statsPage, routes)).toEqual(routes[4]);
  });

  test('Case 8', () => {
    expect(findComponentByPath(HashPath.aboutTeamPage, routes)).toEqual(routes[5]);
  });

  test('Case 9', () => {
    expect(findComponentByPath('#/unknown-route', routes)).toEqual(null);
  });
});
