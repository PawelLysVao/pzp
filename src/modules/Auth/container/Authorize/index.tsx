import { RootState } from 'app/reducer';
import User from 'modules/User/model/User';
import React, { ReactNode } from 'react';
import { connect } from 'react-redux';

export interface AuthorizeStateProps {
  user?: User;
}

export interface AuthorizeProps extends AuthorizeStateProps {
  children: ReactNode;
  fallback?: ReactNode;
  hasAccess?: (user: User) => boolean;
}

export const mapAuthorizeState = (state: RootState): AuthorizeStateProps => {
  const { user } = state.auth;

  return { user };
};

class Authorize extends React.Component<AuthorizeProps> {
  render(): ReactNode {
    const { user, children, hasAccess = null, fallback = null } = this.props;

    if (user) {
      if (hasAccess) {
        if (hasAccess(user)) {
          return children;
        }

        return fallback;
      }

      return children;
    }

    return fallback;
  }
}

export default connect<AuthorizeStateProps>(mapAuthorizeState)(Authorize);
