import { createAuthRoutes } from 'modules/Auth/routes';
import { createLayoutRoutes } from 'modules/Layout/routes';
import { createUserRoutes } from 'modules/User/routes';
import { ReactNode } from 'react';


export type RouteType = 'public' | 'guarded' | 'wrapped';

export type Routes = {
  [type in RouteType]?: ReactNode[];
};

export const registerRoutes = (...routes: Routes[]): Routes => {
  return routes.reduce(
    (previousValue, currentValue) => ({
      public: [...previousValue.public, ...(currentValue.public ?? [])],
      guarded: [...previousValue.guarded, ...(currentValue.guarded ?? [])],
      wrapped: [...previousValue.wrapped, ...(currentValue.wrapped ?? [])]
    }),
    {
         public: [],
      guarded: [],
      wrapped: []
    }
  );
};

export const createRoutes = (): Routes => {
  return registerRoutes(
    createLayoutRoutes(),
    createAuthRoutes(),
    createUserRoutes(),
  );
};
