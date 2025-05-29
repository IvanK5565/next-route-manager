import { Route } from ".";


const routes = [
    '/',
    '/classes/[id]',
    '/classes',
    '/api/users',
]
const nonValidRoutes = [
    '',
    '/classes/[id',
    'classes',
    '/api/users/',
]

test('create Route instance', () => {
    const route = new Route('/');
    expect(route).toBeInstanceOf(Route);
}