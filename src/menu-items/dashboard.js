/* eslint-disable no-debugger */
// assets
import { IconDashboard, IconBrandChrome, IconKey, IconPalette, IconFriends } from '@tabler/icons';
import { loadFromLocalStorage } from 'utils';

// constant
const icons = { IconDashboard, IconBrandChrome, IconKey, IconPalette, IconFriends };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //
const getUserData = loadFromLocalStorage('ctx');
console.log(getUserData);
debugger;
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
    getUserData?.data?.role_name === 'Admin'
      ? {
          id: 'clients',
          title: 'Clients',
          type: 'item',
          url: '/dashboard/clients',
          icon: icons.IconFriends,
          breadcrumbs: false
        }
      : {},
    getUserData?.data?.status === 'member'
      ? {
          id: 'ticket',
          title: 'Tickets',
          type: 'item',
          url: '/dashboard/tickets',
          icon: icons.IconBrandChrome,
          breadcrumbs: false
        }
      : {},
    getUserData?.data?.status === 'client'
      ? {
          id: 'myticket',
          title: 'My Tickets',
          type: 'item',
          url: '/dashboard/my-tickets',
          icon: icons.IconBrandChrome,
          breadcrumbs: false
        }
      : {},
    getUserData?.data?.role_name == 'Admin'
      ? {
          id: 'users',
          title: 'Users',
          type: 'item',
          url: '/dashboard/users',
          icon: icons.IconKey,
          breadcrumbs: false
        }
      : {},
    getUserData?.data?.role_name == 'Admin'
      ? {
          id: 'roles',
          title: 'Roles',
          type: 'item',
          url: '/dashboard/roles',
          icon: icons.IconPalette,
          breadcrumbs: false
        }
      : {},
    getUserData?.data?.role_name == 'Admin'
      ? {
          id: 'permissions',
          title: 'Permissions',
          type: 'item',
          url: '/dashboard/permissions',
          icon: icons.IconPalette,
          breadcrumbs: false
        }
      : {}
  ]
};

export default dashboard;
