import { Routes } from 'app/routes';
import Unguarded from 'modules/Auth/component/Unguarded';
import React from 'react';
import { Route } from 'react-router-dom';
import LoginView from 'modules/Auth/view/Login';

export const ROUTE_LOGIN = '/login';

export const createAuthRoutes = (): Routes => ({
  public: [
    <Route key="login" path={ROUTE_LOGIN} exact>
      <Unguarded>
        <LoginView />
      </Unguarded>
    </Route>
  ]
});
