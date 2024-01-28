import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const AllTicketsViews = Loadable(lazy(() => import('views/tickets')));
const AllUsersViews = Loadable(lazy(() => import('views/users')));
const PermissionsViews = Loadable(lazy(() => import('views/permissions')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        },
        {
          path: 'tickets',
          element: <AllTicketsViews />
        },
        {
          path: 'users',
          element: <AllUsersViews />
        },
        {
          path: 'permissions',
          element: <PermissionsViews />
        }
      ]
    }
  ]
};

export default MainRoutes;
