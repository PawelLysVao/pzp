import { hasToken } from 'modules/Auth/service';
import { ROUTE_DASHBOARD } from 'modules/Layout/routes';
import React, { ReactNode } from 'react';
import { Redirect } from 'react-router-dom';

export type Props = Readonly<{
  children?: ReactNode;
  redirect?: string;
}>;

class Unguarded extends React.Component<Props> {
  protected readonly hasToken: boolean;

  constructor(props: Props) {
    super(props);

    this.hasToken = hasToken();
  }

  render(): ReactNode {
    const { children, redirect = ROUTE_DASHBOARD } = this.props;

    if (this.hasToken) {
      return <Redirect to={redirect} />;
    }

    return children;
  }
}

export default Unguarded;
