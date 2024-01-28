// assets
import { IconDashboard, IconBrandChrome, IconKey, IconPalette } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconBrandChrome, IconKey, IconPalette };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'ticket',
      title: 'Tickets',
      type: 'item',
      url: '/dashboard/tickets',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/dashboard/users',
      icon: icons.IconKey,
      breadcrumbs: false
    },
    {
      id: 'permissions',
      title: 'Permissions',
      type: 'item',
      url: '/dashboard/permissions',
      icon: icons.IconPalette,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
