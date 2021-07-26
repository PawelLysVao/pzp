import { LogoutAction, logoutAction } from 'modules/Auth/action';
import React from 'react';
import { connect } from 'react-redux';
import { Button, DropdownItem } from 'reactstrap';
import { Dispatch } from 'redux';

export type DispatchProps = {
  logout: () => LogoutAction;
};

export interface Props extends DispatchProps {
  dropdownItem?: boolean;
  className?: string;
}

export const mapDispatch = (dispatch: Dispatch): DispatchProps => ({
  logout: () => dispatch(logoutAction())
});

export const NavbarLogout: React.FC<Props> = (props: Props): JSX.Element => {
  const { dropdownItem = false, logout, className = '' } = props;

  if (dropdownItem) {
    return (
      <DropdownItem
        className="text-primary"
        title="Logout"
        onClick={logout}
      >
        <span>Logout</span>
        <i className="fas fa-sign-out-alt ml-1" />
      </DropdownItem>
    );
  }

  return (
    <Button
      type="button"
      color="link"
      className={`p-0 ${className}`}
      title="Logout"
      onClick={logout}
    >
      <span>Logout</span>
      <i className="fas fa-sign-out-alt ml-1" />
    </Button>
  );
};

export default connect<null, DispatchProps>(null, mapDispatch)(NavbarLogout);
