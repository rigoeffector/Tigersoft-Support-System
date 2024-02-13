import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const AllTicketsViews = Loadable(lazy(() => import('views/tickets')));
const AllUsersViews = Loadable(lazy(() => import('views/users')));
const PermissionsViews = Loadable(lazy(() => import('views/permissions')));
const AllClientsViews = Loadable(lazy(() => import('views/clients')));
const RolesViews = Loadable(lazy(() => import('views/roles')));
const MyTicketsViews = Loadable(lazy(() => import('views/my-tickets')));
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
          path: 'clients',
          element: <AllClientsViews />
        },
        {
          path: 'tickets',
          element: <AllTicketsViews />
        },
        {
          path: 'my-tickets',
          element: <MyTicketsViews />
        },
        {
          path: 'users',
          element: <AllUsersViews />
        },
        {
          path: 'Roles',
          element: <RolesViews />
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
