import { ROUTE_DASHBOARD } from 'modules/Layout/routes';
import { Menu } from 'app/menu';

const MenuLayout: Menu[] = [
  {
    key: 'dashboard',
    type: 'link',
    title: 'Dashboard',
    icon: 'remixicon-dashboard-line',
    href: ROUTE_DASHBOARD
  }
];

export default MenuLayout;
