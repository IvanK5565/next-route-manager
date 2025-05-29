import { createRoutes, findRoute, getDynamicValues } from ".";

const routes = [
  '/',
  '/classes/[id]',
  'classes',
  '/api/users/',
  '/api/users/[id]',
  '/api/users/[id]/posts/[postId]'
]

const paths = [// [test, route, query],
  ['/api/users', '/api/users', {}  ],
  ['/api/users/123', routes[4], {id: '123'}],
  ['/api/users/abc', routes[4], {id: 'abc'}],
  ['/api/users/123/posts/456', routes[5], {id: '123', postId: '456'}],
  ['/api/users/abc/posts/def', routes[5], {id: 'abc', postId: 'def'}],
  ['/api/users/123/posts/456/extra', null, {}],
  ['/api/users/123/posts/', null, {}],
]

const pathsAndRoute = paths.map(path => [path[0], path[1]]) as Array<[string, string | null]>;
const pathsAndQuery = paths.map(path => [path[0], path[2]]) as Array<[string, Record<string, string> | null]>;

test('create routes', () => {
  const createdRoutes = createRoutes(routes);
  expect(createdRoutes).toHaveLength(routes.length);
  expect(createdRoutes[0].toString()).toEqual('/');
  expect(createdRoutes[1].toString()).toEqual('/classes/[id]');
  expect(createdRoutes[2].toString()).toEqual('/classes');
});

test.each(pathsAndRoute)('find route by path %s', (path, expectedRoute) => {
  const createdRoutes = createRoutes(routes);
  const route = findRoute(path, createdRoutes);
  if (expectedRoute) {
    expect(route).not.toBeNull();
    expect(route?.toString()).toEqual(expectedRoute);
  } else {
    expect(route).toBeNull();
  }
});

test.each(pathsAndQuery)('get dynamic values from path %s', (path, expectedQuery) => {
  const createdRoutes = createRoutes(routes);
  const dynamicValues = getDynamicValues(path, createdRoutes);
  if (expectedQuery) {
    expect(dynamicValues).toEqual(expectedQuery);
  } else {
    expect(dynamicValues).toEqual({});
  }
});
