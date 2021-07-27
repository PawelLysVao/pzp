import React from 'react';
import { Button, DropdownItem } from 'reactstrap';

export interface Props {
  dropdownItem?: boolean;
}

const NavbarRefresh: React.FC<Props> = (props: Props): JSX.Element => {
  const { dropdownItem } = props;

  if (dropdownItem) {
    return (
      <DropdownItem
        className="text-primary"
        title="Odśwież"
        onClick={() => window.location.reload()}
      >
        <span>Odśwież</span>
        <i className="fas fa-redo-alt ml-1" />
      </DropdownItem>
    );
  }

  return (
    <Button
      type="button"
      color="link"
      className="p-0"
      title="Odśwież"
      onClick={() => window.location.reload()}
    >
      <span>Odśwież</span>
      <i className="fas fa-redo-alt ml-1" />
    </Button>
  );
};

export default NavbarRefresh;
