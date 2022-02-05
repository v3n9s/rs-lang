import { getHashPath, getSearchParams, hasSearchParams, parseLocation } from '../router';

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
  const loc = new URL('http://localhost:5000/#/home');

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
