import { Route } from './Route';
import { Node } from './Node';

function createRoutes(routes: string[]): Route[] {
  return routes.map(route => new Route(route));
}

function findRoute(path: string, routes: Route[]): Route | null {
  for (const route of routes) {
    if (route.isPathMatch(path)) {
      return route;
    }
  }
  return null;
}
function getDynamicValues(path: string, routes: Route[]): Record<string, string> | null {
  const route = findRoute(path, routes);
  return route ? route.getDynamicValues(path) : {};
}

export { Node, Route, createRoutes, findRoute, getDynamicValues };