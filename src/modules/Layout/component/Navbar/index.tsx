import NavbarLogout from 'modules/Layout/component/Navbar/Logout';
import React from 'react';
import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import Logo from 'modules/Layout/component/Logo';

const Navbar: React.FC = (): JSX.Element => {
  return (
    <div className="navbar-custom d-flex">
      <div className="logo-box">
        <Logo width={null} className="logo text-center" />
      </div>
      <ul className="list-unstyled topnav-menu m-0 ml-auto">
        <li>
          <UncontrolledDropdown>
            <DropdownToggle
              color="link"
              className="nav-link waves-effect waves-light text-white"
            >
              <i className="mdi mdi-chevron-down" />
            </DropdownToggle>
            <DropdownMenu right>
              <NavbarLogout dropdownItem />
            </DropdownMenu>
          </UncontrolledDropdown>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
