import React from 'react';
import { ROUTE_DASHBOARD } from 'modules/Layout/routes';
import logo from './fyta_logo.png';

export interface Props {
  route?: string;
  width?: number;
  className?: string;
}

const Logo: React.FC<Props> = (props: Props): JSX.Element => {
  const { className, route = ROUTE_DASHBOARD, width = 160 } = props;

  return (
    <div className={className}>
      <a href={route} className="logo" style={{ maxWidth: width }}>
        <img src={logo} alt="" height="60" />
      </a>
    </div>
  );
};

export default Logo;
