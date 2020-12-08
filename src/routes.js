import React from 'react';

const Users = React.lazy(() => import('./views/users/Users'));
const MemberList = React.lazy(() => import('./views/member/MemberList'));
const ClubList = React.lazy(()=> import('./views/club/ClubList'));
const ClubInfo = React.lazy(()=> import('./views/club/ClubInfo'));
const ClubRegister = React.lazy(()=>import('./views/club/ClubRegister'));
const CodeGroupList = React.lazy(()=> import('./views/commonCode/CodeGroupList'));
const CodeGroupInfo = React.lazy(()=> import('./views/commonCode/CodeGroupInfo'));
const CodeGroupRegister = React.lazy(()=>import('./views/commonCode/CodeGroupRegister'));
const ErrorCodeList = React.lazy(()=> import('./views/errorCode/ErrorCodeList'));
const ErrorCodeInfo = React.lazy(()=> import('./views/errorCode/ErrorCodeInfo'));
const ErrorCodeRegister = React.lazy(() => import('./views/errorCode/ErrorCodeRegister'));
const Dashboard = React.lazy(()=> import('./views/dashboard/Dashboard'));
const CacheReload = React.lazy(()=> import('./views/cacheReload/CacheReload'));
const Log = React.lazy(()=> import('./views/log/Log'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/member/memberlist', name: 'MemberList', component: MemberList },
  { path: '/club/clublist', name: 'ClubList', component: ClubList },
  { path: '/club/clubinfo/:id', name: 'ClubInfo', component: ClubInfo },
  { path: '/club/register', name: 'ClubRegister', component: ClubRegister }, 
  { path: '/commoncode/codegrouplist', name: 'CodeGroupList', component: CodeGroupList },
  { path: '/commoncode/codegroupinfo/:id', name: 'CodeGroupInfo', component: CodeGroupInfo },
  { path: '/commoncode/register', name: 'CodeGroupRegister', component: CodeGroupRegister }, 
  { path: '/errorcode/errorcodelist', name: 'ErrorCodeList', component: ErrorCodeList },
  { path: '/errorcode/errorcodeinfo/:id', name: 'ErrorCodeInfo', component: ErrorCodeInfo },
  { path: '/errorcode/register', name: 'ErrorCodeRegister', component: ErrorCodeRegister },
  { path: '/cachereload', name: 'CacheReload', component: CacheReload },
  { path: '/log', name: 'Log', component: Log }
];

export default routes;
