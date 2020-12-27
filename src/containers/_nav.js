import React from 'react'
import CIcon from '@coreui/icons-react'

export default [
  {
    _tag: 'CSidebarNavItem',
    name: '관리자 페이지',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Components']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: '회원',
    route: '/membermenu',
    icon: 'cil-user',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: '회원 목록 조회',
        to: '/member/list',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: '클럽',
    route: '/clubmenu',
    icon: 'cil-people',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: '클럽 목록 조회',
        to: '/club/list',
      }
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: '공통코드',
    to: '/commoncodemenu',
    icon: 'cil-spreadsheet',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: '공통 코드 목록 조회',
        to: '/commoncode/codegroup/list',
      }
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: '에러코드',
    route: '/errorcodemenu',
    icon: 'cil-bell',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: '에러 코드 목록 조회',
        to: '/errorcode/list',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      }
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: '리로드',
    to: '/reloadmenu',
    icon: 'cil-code',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: '캐시 리로드',
        to: '/cachereload',
        badge: {
          color: 'success',
          text: 'Click',
        },
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: '로그',
    to: '/logmenu',
    icon: 'cil-comment-square',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: '로그 조회',
        to: '/log',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
    ],
  },
  {
    _tag: 'CSidebarNavDivider'
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Extras'],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Pages',
    route: '/pages',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Login',
        to: '/login',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Register',
        to: '/register',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Error 404',
        to: '/404',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Disabled',
    icon: 'cil-ban',
    badge: {
      color: 'secondary',
      text: 'NEW',
    },
    addLinkClass: 'c-disabled',
    'disabled': true
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Labels']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Label danger',
    to: '',
    icon: {
      name: 'cil-star',
      className: 'text-danger'
    },
    label: true
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Label info',
    to: '',
    icon: {
      name: 'cil-star',
      className: 'text-info'
    },
    label: true
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Label warning',
    to: '',
    icon: {
      name: 'cil-star',
      className: 'text-warning'
    },
    label: true
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

