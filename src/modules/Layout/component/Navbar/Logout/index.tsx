import { logoutAction } from 'modules/Auth/action';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, DropdownItem } from 'reactstrap';

export interface Props {
  dropdownItem?: boolean;
  className?: string;
}

export const NavbarLogout: React.FC<Props> = (props: Props): JSX.Element => {
  const { dropdownItem = false, className = '' } = props;

  const dispatch = useDispatch();

  const logout = () => dispatch(logoutAction());

  if (dropdownItem) {
    return (
      <DropdownItem className="text-primary" title="Wyloguj z systemu" onClick={logout}>
        <span>Wyloguj</span>
        <i className="fas fa-sign-out-alt ml-1" />
      </DropdownItem>
    );
  }

  return (
    <Button type="button" color="link" className={`p-0 ${className}`} title="Wyloguj z systemu" onClick={logout}>
      <span>Wyloguj</span>
      <i className="fas fa-sign-out-alt ml-1" />
    </Button>
  );
};

export default NavbarLogout;
