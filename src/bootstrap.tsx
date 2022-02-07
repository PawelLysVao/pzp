import { registerAxiosInterceptors } from 'app/interceptors';
import { createRoutes } from 'app/routes';
import configureStore from 'app/store';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import Guard from 'modules/Auth/container/Guard';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Wrapper from 'modules/Layout/component/Wrapper';
import LayoutLoader from 'modules/Layout/container/Loader';
import Toast from 'modules/Layout/container/Toast';
import SidebarMenu from 'modules/Layout/component/Sidebar/Menu';
import Navbar from 'modules/Layout/component/Navbar';

const history = createBrowserHistory();
const store = configureStore(history);
const routes = createRoutes();

registerAxiosInterceptors(store);

document.addEventListener<'input'>('input', (event: Event) => {
  const element = event.target as HTMLElement;

  element.classList.remove('is-invalid');

  if (element.parentElement && element.parentElement.classList.contains('input-group')) {
    element.parentElement.classList.remove('is-invalid');
  }
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Toast />
      <LayoutLoader />
      <Switch>
        {routes.public}
        <Route path="/">
          <Guard>
            {routes.guarded}
            <Wrapper sidebarMenu={<SidebarMenu />} navbar={<Navbar />}>
              {routes.wrapped}
            </Wrapper>
          </Guard>
        </Route>
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
