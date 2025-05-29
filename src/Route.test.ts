import { Route } from './Route';

const routesForCheck = [// [test, expected],
  ['','/',],
  ['/classes/[id','/classes/[id',],
  ['classes','/classes',],
  ['/api/users/','/api/users',],
]

test('create Route instance', () => {
  const route = new Route('/');
  expect(route).toBeInstanceOf(Route);
})

test('create Route instance with empty string', () => {
  const route = new Route('');
  expect(route.toString()).toEqual('/');
})

test.each(routesForCheck)('create Route instance with %s', (test, expected) => {
  const route = new Route(test);
  expect(route.toString()).toEqual(expected);
})

test('check path match', () => {
  const route1 = new Route('/api/users');
  expect(route1.isPathMatch('/api/users')).toBeTruthy();
  expect(route1.isPathMatch('/api/users/123')).toBeFalsy();
  expect(route1.isPathMatch('/api/users/')).toBeTruthy();
  expect(route1.isPathMatch('/api/users/abc')).toBeFalsy();
});

test('check path match with dynamic segments', () => {
    const route = new Route('/api/users/[id]');
  expect(route.isPathMatch('/api/users/123')).toBeTruthy();
  expect(route.isPathMatch('/api/users/')).toBeFalsy();
  expect(route.isPathMatch('/api/users/123/extra')).toBeFalsy();
  expect(route.isPathMatch('/api/users/abc')).toBeTruthy();
});

test('get dynamic values from path', () => {
  const route = new Route('/api/users/[id]');
  expect(route.getDynamicValues('/api/users/123')).toEqual({ id: '123' });
  expect(route.getDynamicValues('/api/users/abc')).toEqual({ id: 'abc' });
  expect(route.getDynamicValues('/api/users/')).toEqual({});
  expect(route.getDynamicValues('/api/users/123/extra')).toEqual({});
});
test('get dynamic values from path with multiple dynamic segments', () => {
  const route = new Route('/api/users/[id]/posts/[postId]');
  expect(route.getDynamicValues('/api/users/123/posts/456')).toEqual({ id: '123', postId: '456' });
  expect(route.getDynamicValues('/api/users/abc/posts/def')).toEqual({ id: 'abc', postId: 'def' });
  expect(route.getDynamicValues('/api/users/123')).toEqual({});
  expect(route.getDynamicValues('/api/users/123/posts/456/extra')).toEqual({});
});
test('get dynamic values from path with no dynamic segments', () => {
  const route = new Route('/api/users');
  expect(route.getDynamicValues('/api/users')).toEqual({});
  expect(route.getDynamicValues('/api/users/123')).toEqual({});
  expect(route.getDynamicValues('/api/123')).toEqual({});
});