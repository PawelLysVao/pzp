import React, { ReactNode } from 'react';
import MetisMenu from 'metismenujs';
import './style.scss';
import { Menu, MenuNested, MenuSection, MenuLink, MenuItems } from 'app/menu';
import Authorized from 'modules/Auth/container/Authorize';
import { NavLink } from 'react-router-dom';
import User from 'modules/User/model/User';
import { connect } from 'react-redux';
import { RootState } from 'app/reducer';

export interface StateProps {
  user: User;
}

export const mapState = (state: RootState): StateProps => {
  const { user } = state.auth;

  return {
    user
  };
};

class SidebarMenu extends React.Component<StateProps> {
  protected menu: MetisMenu;

  componentDidMount(): void {
    this.menu = new MetisMenu('#side-menu');
  }

  // eslint-disable-next-line class-methods-use-this
  renderLink(item: MenuLink, className = ''): ReactNode {
    const { title, href, icon, key, hasAccess = null } = item;
    return (
      <Authorized key={key} hasAccess={hasAccess}>
        <li className={className}>
          <NavLink to={href} exact className="side-nav-link-ref">
            {icon && <i className={icon} />}
            <span className="white-break-spaces"> {title} </span>
          </NavLink>
        </li>
      </Authorized>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderSection(item: MenuSection, className = ''): ReactNode {
    const { key, title, icon, hasAccess = null } = item;
    return (
      <Authorized key={key} hasAccess={hasAccess}>
        <li key={key} className={`menu-title ${className}`}>
          {icon && <i className={icon} />}
          <span className="white-break-spaces"> {title} </span>
        </li>
      </Authorized>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderNested(item: MenuNested, className = ''): ReactNode {
    const { children, navLevel, title, icon, href, key, isActive = null, hasAccess = null } = item;
    const builtChildren = children.map((child) => this.renderMenu(child, className));
    return (
      <Authorized key={key} hasAccess={hasAccess}>
        <li className={className}>
          <NavLink to={href} isActive={isActive} className="waves-effect has-dropdown" aria-expanded="false">
            {icon && <i className={icon} />}
            <span className="white-break-spaces"> {title} </span>
            <span className="menu-arrow" />
          </NavLink>
          {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props */}
          <ul className={`nav-${navLevel}-level`} aria-expanded="false">
            {builtChildren}
          </ul>
        </li>
      </Authorized>
    );
  }

  renderMenu(item: Menu, className = ''): ReactNode {
    switch (item.type) {
      case 'section': {
        return this.renderSection(item, className);
      }

      case 'nested': {
        return this.renderNested(item, className);
      }

      case 'link': {
        return this.renderLink(item, className);
      }

      default: {
        return null;
      }
    }
  }

  render(): React.ReactNode {
    const menu = MenuItems.map((entry) => this.renderMenu(entry));

    return (
      <>
        <div id="sidebar-menu">
          <ul className="metismenu" id="side-menu">
            {menu}
          </ul>
        </div>
        <div className="clearfix" />
      </>
    );
  }
}

export default connect<StateProps>(mapState)(SidebarMenu);
