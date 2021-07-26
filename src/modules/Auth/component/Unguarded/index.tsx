import { hasToken } from 'modules/Auth/service';
import React from 'react';
import { Redirect } from 'react-router-dom';

export type Props = {
  redirect?: string;
};

const Unguarded: React.FC<Props> = ({ redirect, children }) => {
  const _hasToken = hasToken();

  if (_hasToken) {
    return <Redirect to={redirect} />;
  }

  return <>{children}</>;
};

export default Unguarded;
