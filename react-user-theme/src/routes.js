import React from 'react';
import UpdateUser from './views/Users/updateUser';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const Profile = React.lazy(() => import('./views/Profile/Profile'));

const User = React.lazy(() => import('./views/Users/User'));

const routes = [{
    path: '/',
    exact: true,
    name: 'Home'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/users',
    exact: true,
    name: 'Users',
    component: Users
  },
  {
    path: '/users/:id',
    exact: true,
    name: 'User Details',
    component: User
  },
  {
    path: '/users/update/:id',
    exact: true,
    name: 'User Details',
    component: UpdateUser
  },
  {
    path: '/profile',
    exact: true,
    name: 'Profile',
    component: Profile
  },

];

export default routes;
