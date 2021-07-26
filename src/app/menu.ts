import * as H from 'history';
import MenuLayout from 'modules/Layout/menu';

import React from 'react';
import User from 'modules/User/model/User';

export type MenuKey = string;

export interface MenuItem<T extends string> {
  key: MenuKey;
  type: T;
  title: React.ReactNode;
  icon?: string;
  hasAccess?: (user: User) => boolean;
}

export interface MenuLink extends MenuItem<'link'> {
  href: string;
}

export interface MenuNested extends MenuItem<'nested'> {
  href: string;
  children: Menu[];
  navLevel: 'second' | 'third';
  isActive?: (_match: null, location: H.Location) => boolean;
}

export type MenuSection = MenuItem<'section'>;

export type Menu = MenuLink | MenuNested | MenuSection;

export const MenuItems: Menu[] = [...MenuLayout];
