import { Routes } from 'app/routes';
import Dashboard from 'modules/Layout/view/Dashboard';
import React from 'react';
import { Route } from 'react-router-dom';

export const ROUTE_DASHBOARD = '/';

export const createLayoutRoutes = (): Routes => ({
  wrapped: [
    <Route key="dashboard" path={ROUTE_DASHBOARD} exact component={Dashboard} />
  ]
});
