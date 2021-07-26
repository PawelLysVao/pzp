import { ROUTE_LOGIN } from 'modules/Auth/routes';
import logo from 'modules/Layout/component/Navbar/logo.svg';
import React from 'react';

export interface Props {
  route?: string;
}

const Logo: React.FC<Props> = (props: Props): JSX.Element => {
  const { route = ROUTE_LOGIN } = props;

  return (
    <a href={route} className="auth-logo d-inline-flex">
      <img src={logo} alt="" height="60" />
    </a>
  );
};

export default Logo;
