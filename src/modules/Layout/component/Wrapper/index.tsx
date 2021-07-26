import Sidebar from 'modules/Layout/component/Sidebar';
import Page from 'modules/Layout/container/Page';
import React, { ReactElement, ReactNode } from 'react';
import { BreadcrumbItem } from 'modules/Layout/type';

export interface Props {
  readonly navbar: ReactElement;
  readonly sidebarMenu: ReactNode;
  defaultBreadcrumbItem?: BreadcrumbItem;
}

class Wrapper extends React.Component<Props> {
  render(): React.ReactNode {
    const { children, sidebarMenu, defaultBreadcrumbItem, navbar } = this.props;

    return (
      <div id="wrapper">
        {navbar}
        <Sidebar menu={sidebarMenu} />
        <Page defaultBreadcrumbItem={defaultBreadcrumbItem}>{children}</Page>
      </div>
    );
  }
}

export default Wrapper;
