import React from 'react';

const Users = React.lazy(() => import('./views/users/Users'));
const MemberList = React.lazy(() => import('./views/member/MemberList'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/member/memberlist', name: 'MemberList', component: MemberList }
];

export default routes;
