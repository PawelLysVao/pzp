import { ROUTE_LOGIN } from 'modules/Auth/routes';
import orangeLogo from 'vendor/minton/svg/ornament-orange.svg';
import greenLogo from 'vendor/minton/svg/ornament-green.svg';
import React from 'react';
import './style.scss';

export interface Props {
  route?: string;
  width?: number;
  text?: string;
  type?: 'orange' | 'green';
}

const AuthLogo: React.FC<Props> = (props: Props): JSX.Element => {
  const { type = 'green', route = ROUTE_LOGIN, width = 160, text = '' } = props;

  return (
    <a href={route} className="auth-logo" style={{ maxWidth: width }}>
      <img src={type === 'green' ? greenLogo : orangeLogo} alt="" height="60" />
      <span style={{ color: type === 'green' ? '#FFF' : '#000' }}>{text}</span>
    </a>
  );
};

export default AuthLogo;
