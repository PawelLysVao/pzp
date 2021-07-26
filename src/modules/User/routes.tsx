import Authorize from 'modules/Auth/container/Authorize';
import UsersListView from 'modules/User/view/List';
import { Routes } from 'app/routes';
import React from 'react';
import { Route } from 'react-router-dom';

export const ROUTE_USERS = '/users';

export const createUserRoutes = (): Routes => ({
  wrapped: [
    <Authorize key="users">
      <Route path={ROUTE_USERS} exact component={UsersListView} />
    </Authorize>
  ]
});
