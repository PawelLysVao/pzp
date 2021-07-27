import Sidebar from 'modules/Layout/component/Sidebar';
import Page from 'modules/Layout/container/Page';
import React, { ReactElement, ReactNode } from 'react';
import { BreadcrumbItem, SCREEN_MOBILE_WIDTH } from 'modules/Layout/type';

export type State = {
  sidebar: {
    expanded: boolean;
  };
};

export interface Props {
  readonly navbar: ReactElement;
  readonly sidebarMenu: ReactNode;
  defaultBreadcrumbItem?: BreadcrumbItem;
}

class Wrapper extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const isBig = window.innerWidth > SCREEN_MOBILE_WIDTH;

    this.state = {
      sidebar: {
        expanded: isBig
      }
    };

    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar(): void {
    const { sidebar } = this.state;

    this.setState({ sidebar: { ...sidebar, expanded: !sidebar.expanded } });
  }

  render(): React.ReactNode {
    const { children, sidebarMenu, defaultBreadcrumbItem, navbar } = this.props;
    const { sidebar } = this.state;

    return (
      <div id="wrapper">
        {React.cloneElement(navbar, {
          toggleSidebar: this.toggleSidebar,
          expanded: sidebar.expanded
        })}
        <Sidebar expanded={sidebar.expanded} menu={sidebarMenu} toggle={this.toggleSidebar} />
        <Page defaultBreadcrumbItem={defaultBreadcrumbItem}>{children}</Page>
      </div>
    );
  }
}

export default Wrapper;
