import { Menu } from 'app/menu';
import { ROUTE_USERS } from 'modules/User/routes';

const MenuUser: Menu[] = [
  {
    key: 'users',
    type: 'link',
    title: 'Users',
    icon: 'remixicon-dashboard-line',
    href: ROUTE_USERS
  }
];

export default MenuUser;
