import React from 'react';
import NavbarLogout from 'modules/Layout/component/Navbar/Logout';
import { hasToken } from 'modules/Auth/service';
import { Link } from 'react-router-dom';
import { ROUTE_DASHBOARD } from 'modules/Layout/routes';
import { ROUTE_LOGIN } from 'modules/Auth/routes';

export const NavbarLoginLogout: React.FC = (): JSX.Element => {
  const loggedIn = hasToken();

  if (loggedIn) {
    return (
      <>
        <li>
          <Link className="nav-link" to={ROUTE_DASHBOARD}>
            Wróć do panelu
          </Link>
        </li>
        <li>
          <NavbarLogout className="nav-link" />
        </li>
      </>
    );
  }

  return (
    <Link className="nav-link" to={ROUTE_LOGIN}>
      Zaloguj się
    </Link>
  );
};

export default NavbarLoginLogout;
