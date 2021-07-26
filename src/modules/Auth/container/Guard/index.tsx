import { RootState } from 'app/reducer';
import { push } from 'connected-react-router';
import { authenticateAction } from 'modules/Auth/action';
import { ROUTE_LOGIN } from 'modules/Auth/routes';
import { hasToken } from 'modules/Auth/service';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Guard: React.FC<{}> = ({ children }) => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state: RootState) => state.auth);
  const _hasToken = hasToken();

  useEffect(() => {
    if (_hasToken) {
      dispatch(authenticateAction());
    } else {
      dispatch(push(ROUTE_LOGIN));
    }
  }, []);

  if (authenticated) {
    return <>{children}</>;
  }

  return null;
};

export default Guard;
