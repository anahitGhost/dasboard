import React from 'react';
import { ReactComponent as BasketSvg } from './assets/icons/basket.svg';
import { ReactComponent as DashboardSvg } from './assets/icons/dashboard.svg';
import { ReactComponent as ProductSvg } from './assets/icons/drug.svg';
import { ReactComponent as RoleSvg } from './assets/icons/role.svg';
import { ReactComponent as PatientsSvg } from './assets/icons/patients.svg';
import { ReactComponent as TeamMembersSvg } from './assets/icons/team_members.svg';

const menus = [
  {
    menu: 'Analytics',
    path: '/dashboard',
    icon: <DashboardSvg />,
    permissions: ['VIEW_PLAN_COMPANY_DASHBOARD'],
  },
  {
    menu: 'Orders',
    path: '/orders',
    icon: <BasketSvg />,
    permissions: ['VIEW_ORDERS'],
  },
  // {
  //   menu: 'Settings',
  //   path: '/settings',
  //   icon: <SettingsSvg />,
  // },
  {
    menu: 'Members',
    path: '/patients',
    icon: <PatientsSvg />,
    permissions: ['VIEW_MEMBERS_LIST', 'MEMBER_INFO_DOWNLOAD'],
  },
  {
    menu: 'Products',
    path: '/products',
    icon: <ProductSvg />,
    permissions: ['VIEW_PRODUCTS'],
  },
  // {
  //   menu: 'Team members',
  //   path: '/team-members',
  //   icon: <TeamMembersSvg />,
  //   permissions: ['CREATE_TEAM_MEMBER', 'DELETE_TEAM_MEMBER', 'UPDATE_TEAM_MEMBER', 'VIEW_TEAM_MEMBERS', 'VIEW_TEAM_MEMBERS_DETAILS_PAGE'],
  //
  // },
  // {
  //   menu: 'Roles',
  //   path: '/roles',
  //   icon: <RoleSvg />,
  //   permissions: ['CREATE_ROLES', 'UPDATE_AND_DELETE_ROLES', 'VIEW_ROLES_PAGE'],
  // },
];

export default menus;
