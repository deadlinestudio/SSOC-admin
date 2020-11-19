import React from 'react';

const Users = React.lazy(() => import('./views/users/Users'));
const MemberList = React.lazy(() => import('./views/member/MemberList'));
const ClubList = React.lazy(()=> import('./views/club/ClubList'));
const CodeGroupList = React.lazy(()=> import('./views/commonCode/CodeGroupList'));
const CodeGroupInfo = React.lazy(()=> import('./views/commonCode/CodeGroupInfo'));
const CodeGroupRegister = React.lazy(()=>import('./views/commonCode/CodeGroupRegister'));
const ErrorCodeList = React.lazy(()=> import('./views/errorCode/ErrorCodeList'));
const ErrorCodeInfo = React.lazy(()=> import('./views/errorCode/ErrorCodeInfo'));
const ErrorCodeRegister = React.lazy(() => import('./views/errorCode/ErrorCodeRegister'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/member/memberlist', name: 'MemberList', component: MemberList },
  { path: '/club/clublist', name: 'ClubList', component: ClubList },
  { path: '/commoncode/codegrouplist', name: 'CodeGroupList', component: CodeGroupList },
  { path: '/commoncode/codegroupinfo/:id', name: 'CodeGroupInfo', component: CodeGroupInfo },
  { path: '/commoncode/register', name: 'CodeGroupRegister', component: CodeGroupRegister }, 
  { path: '/errorCode/errorcodelist', name: 'ErrorCodeList', component: ErrorCodeList },
  { path: '/errorCode/errorcodelist/:id', name: 'ErrorCodeInfo', component: ErrorCodeInfo },
  { path: '/errorCode/register', name: 'ErrorCodeRegister', component: ErrorCodeRegister } 
];

export default routes;
