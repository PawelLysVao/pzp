import React, { ReactNode } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

export type SidebarProps = {
  readonly menu?: ReactNode;
};

class Sidebar extends React.Component<SidebarProps> {
  protected readonly menuRef: React.RefObject<HTMLDivElement>;

  constructor(props: SidebarProps) {
    super(props);

    this.menuRef = React.createRef();
  }

  render(): React.ReactNode {
    const { menu } = this.props;

    return (
      <div ref={this.menuRef} className="left-side-menu">
        <PerfectScrollbar>{menu}</PerfectScrollbar>
      </div>
    );
  }
}

export default Sidebar;
