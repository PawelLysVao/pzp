import React, { ReactNode } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { SCREEN_MOBILE_WIDTH } from 'modules/Layout/type';

export type SidebarProps = {
  readonly menu?: ReactNode;
  expanded: boolean;
  toggle: () => void;
};

class Sidebar extends React.Component<SidebarProps> {
  protected readonly menuRef: React.RefObject<HTMLDivElement>;

  constructor(props: SidebarProps) {
    super(props);

    this.menuRef = React.createRef();

    this.handleMousedown = this.handleMousedown.bind(this);
    this.updateClasses = this.updateClasses.bind(this);
  }

  componentDidMount(): void {
    document.addEventListener('mousedown', this.handleMousedown, false);
    this.updateClasses();
  }

  componentDidUpdate(): void {
    this.updateClasses();
  }

  componentWillUnmount(): void {
    document.removeEventListener('mousedown', this.handleMousedown, false);
  }

  updateClasses(): void {
    const { expanded } = this.props;

    if (expanded) {
      document.body.classList.add('sidebar-enable');
      document.body.classList.remove('sidebar-disable');
    } else {
      document.body.classList.add('sidebar-disable');
      document.body.classList.remove('sidebar-enable');
    }
  }

  handleMousedown(event: MouseEvent): void {
    const { expanded, toggle } = this.props;

    const { current: div } = this.menuRef;

    const { target } = event;

    const isMobile = window.innerWidth <= SCREEN_MOBILE_WIDTH;

    if (expanded && isMobile) {
      const isBurger = event
        .composedPath()
        .some((element) => (element instanceof HTMLElement ? element.classList.contains('button-menu-mobile') : false));

      if (!isBurger) {
        if (target instanceof Node && !div.contains(target)) {
          toggle();
        }
      }
    }
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
