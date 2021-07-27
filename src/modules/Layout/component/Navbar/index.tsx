import logo from 'modules/Layout/component/Navbar/logo.svg';
import NavbarLogout from 'modules/Layout/component/Navbar/Logout';
import NavbarRefresh from 'modules/Layout/component/Navbar/Refresh';
// import NavbarSwitcher from 'modules/Layout/component/Navbar/Switcher';
// import NavbarUserInfo from 'modules/Layout/component/Navbar/UserInfo';
import { ROUTE_DASHBOARD } from 'modules/Layout/routes';
import React from 'react';
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownToggle, UncontrolledDropdown, UncontrolledTooltip } from 'reactstrap';

export type Props = {
  toggleSidebar?: () => void;
  expanded?: boolean;
};

const Navbar: React.FC<Props> = (props: Props): JSX.Element => {
  const { toggleSidebar, expanded } = props;

  return (
    <div className="navbar-custom d-flex">
      <div className="logo-box">
        <Link to={ROUTE_DASHBOARD} className="logo text-center">
          <span className="logo-lg">
            <img src={logo} alt="" height="45" />
          </span>
        </Link>
      </div>
      {toggleSidebar && (
        <>
          <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
            <li className="d-inline-block">
              <button
                id="toggle-sidebar-btn"
                type="button"
                className="button-menu-mobile waves-effect waves-light"
                onClick={toggleSidebar}
              >
                <i className="fe-menu" />
              </button>
              <UncontrolledTooltip className="toggle-sidebar-tooltip" placement="bottom" target="#toggle-sidebar-btn">
                {expanded ? 'Ukryj' : 'Pokaż'} menu
              </UncontrolledTooltip>
            </li>
            {/* <NavbarUserInfo /> */}
          </ul>
        </>
      )}
      <ul className="list-unstyled topnav-menu m-0 ml-auto">
        <li>
          <UncontrolledDropdown>
            <DropdownToggle color="link" className="nav-link waves-effect waves-light text-white">
              <i className="mdi mdi-chevron-down" />
            </DropdownToggle>
            <DropdownMenu right>
              {/* <NavbarSwitcher dropdownItem /> */}
              <NavbarRefresh dropdownItem />
              <NavbarLogout dropdownItem />
            </DropdownMenu>
          </UncontrolledDropdown>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

// import NavbarLogout from 'modules/Layout/component/Navbar/Logout';
// import React from 'react';
// import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
// import Logo from 'modules/Layout/component/Logo';

// const Navbar: React.FC = (): JSX.Element => {
//   return (
//     <div className="navbar-custom d-flex">
//       <div className="logo-box">
//         <Logo width={null} className="logo text-center" />
//       </div>
//       <ul className="list-unstyled topnav-menu m-0 ml-auto">
//         <li>
//           <UncontrolledDropdown>
//             <DropdownToggle
//               color="link"
//               className="nav-link waves-effect waves-light text-white"
//             >
//               <i className="mdi mdi-chevron-down" />
//             </DropdownToggle>
//             <DropdownMenu right>
//               <NavbarLogout dropdownItem />
//             </DropdownMenu>
//           </UncontrolledDropdown>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Navbar;
