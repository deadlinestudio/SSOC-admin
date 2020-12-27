import React from 'react';

const MemberList = React.lazy(() => import('./views/member/MemberList'));
const ClubList = React.lazy(()=> import('./views/club/ClubList'));
const ClubInfo = React.lazy(()=> import('./views/club/ClubInfo'));
const ClubRegister = React.lazy(()=>import('./views/club/ClubRegister'));
const CodeGroupList = React.lazy(()=> import('./views/commonCode/CodeGroupList'));
const CodeGroupInfo = React.lazy(()=> import('./views/commonCode/CodeGroupInfo'));
const CodeGroupRegister = React.lazy(()=>import('./views/commonCode/CodeGroupRegister'));
const MainCodeList = React.lazy(()=> import('./views/commonCode/MainCodeList'));
const MainCodeInfo = React.lazy(()=> import('./views/commonCode/MainCodeInfo'));
const MainCodeRegister = React.lazy(()=>import('./views/commonCode/MainCodeRegister'));
const SubCodeList = React.lazy(()=> import('./views/commonCode/SubCodeList'));
const SubCodeInfo = React.lazy(()=> import('./views/commonCode/SubCodeInfo'));
const SubCodeRegister = React.lazy(()=>import('./views/commonCode/SubCodeRegister'));
const ErrorCodeList = React.lazy(()=> import('./views/errorCode/ErrorCodeList'));
const ErrorCodeInfo = React.lazy(()=> import('./views/errorCode/ErrorCodeInfo'));
const ErrorCodeRegister = React.lazy(() => import('./views/errorCode/ErrorCodeRegister'));
const Dashboard = React.lazy(()=> import('./views/dashboard/Dashboard'));
const CacheReload = React.lazy(()=> import('./views/cacheReload/CacheReload'));
const Log = React.lazy(()=> import('./views/log/Log'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/member/list', name: 'MemberList', component: MemberList },
  { path: '/club/list', name: 'ClubList', component: ClubList },
  { path: '/club/info/:clubId', name: 'ClubInfo', component: ClubInfo },
  { path: '/club/register', name: 'ClubRegister', component: ClubRegister }, 
  { path: '/commoncode/codegroup/list', name: 'CodeGroupList', component: CodeGroupList },
  { path: '/commoncode/codegroup/info/:codeGroupId', name: 'CodeGroupInfo', component: CodeGroupInfo },
  { path: '/commoncode/codegroup/register', name: 'CodeGroupRegister', component: CodeGroupRegister }, 
  { path: '/errorcode/list', name: 'ErrorCodeList', component: ErrorCodeList },
  { path: '/commoncode/maincode/list/:codeGroupId', name: 'MainCodeList', component: MainCodeList },
  { path: '/commoncode/maincode/info/:codeGroupId/:codeId', name: 'MainCodeInfo', component: MainCodeInfo },
  { path: '/commoncode/maincode/register/:codeGroupId', name: 'MainCodeRegister', component: MainCodeRegister }, 
  { path: '/commoncode/subcode/list/:codeGroupId/:codeId', name: 'SubCodeList', component: SubCodeList },
  { path: '/commoncode/subcode/info/:codeGroupId/:codeId', name: 'SubCodeInfo', component: SubCodeInfo },
  { path: '/commoncode/subcode/register/:codeGroupId/:codeId', name: 'SubCodeRegister', component: SubCodeRegister }, 
  { path: '/errorcode/list', name: 'ErrorCodeList', component: ErrorCodeList },
  { path: '/errorcode/info/:errorCodeId', name: 'ErrorCodeInfo', component: ErrorCodeInfo },
  { path: '/errorcode/register', name: 'ErrorCodeRegister', component: ErrorCodeRegister },
  { path: '/cachereload', name: 'CacheReload', component: CacheReload },
  { path: '/log', name: 'Log', component: Log }
];

export default routes;
