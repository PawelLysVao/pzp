import { RootState } from 'app/reducer';
import User from 'modules/User/model/User';
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';

export interface AuthorizeProps {
  fallback?: ReactNode;
  hasAccess?: (user: User) => boolean;
}

const Authorize: React.FC<AuthorizeProps> = ({ fallback, hasAccess, children }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (user) {
    if (hasAccess) {
      if (hasAccess(user)) {
        return <>{children}</>;
      }

      return <>{fallback}</>;
    }

    return <>{children}</>;
  }

  return <>{fallback}</>;
};

export default Authorize;
