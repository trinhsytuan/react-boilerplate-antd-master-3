import React, { lazy } from 'react';
import {
  CalculatorIcon,
  ChartIcon,
  CheckIcon,
  FileIcon,
  HomeIcon,
  ListIcon,
  OrgUnitIcon,
  SettingIcon,
  TaskIcon,
  UserIcon,
} from '@app/components/Icons';

import { URL } from '@url';
import { create } from '@app/rbac/permissionHelper';
import resources from '@app/rbac/resources';
import actions from '@app/rbac/actions';

const MyInfo = lazy(() => import('@containers/MyInfo/MyInfo'));
const TrangChu = lazy(() => import('@containers/TrangChu/TrangChu'));
const Setting = lazy(() => import('@containers/Setting/Setting'));
const DuLieuBoSung = lazy(() => import('@containers/DuLieuBoSung/DuLieuBoSung'));
const User = lazy(() => import('@containers/User/User'));
const DonVi = lazy(() => import('@containers/DonVi/DonVi'));
const KhoiPhucTaiKhoan = lazy(() => import('@containers/User/KhoiPhucTaiKhoan'));
const Role = lazy(() => import('@containers/Role/Role'));


function renderIcon(icon) {
  return <span role="img" className="main-menu__icon">
      <div className="position-absolute" style={{ top: '50%', transform: 'translateY(-50%)' }}>
        <div className="position-relative" style={{ width: '30px', height: '30px' }}>
          {icon}
        </div>
      </div>
    </span>;
}

const MY_INFO_ROUTE = { path: URL.THONG_TIN_CA_NHAN, breadcrumbName: 'Thông tin cá nhân', component: MyInfo, permission: [] };

export const ADMIN_ROUTES = [
  // { isRedirect: true, from: '/', to: URL.MENU.DASHBOARD },
  {
    path: URL.MENU.DASHBOARD,
    menuName: 'Trang chủ',
    component: TrangChu,
    icon: renderIcon(<HomeIcon/>),
    permission: [],
  },
  {
    key: URL.MENU.QUAN_LY_NGUOI_DUNG,
    menuName: 'Người dùng',
    icon: renderIcon(<UserIcon/>),
    children: [
      {
        path: URL.MENU.USER, menuName: 'Danh sách người dùng', component: User,
        permission: [create(resources.NGUOI_DUNG, actions.READ)],
      },
      {
        path: URL.MENU.KHOI_PHUC_TAI_KHOAN, menuName: 'Khôi phục tài khoản', component: KhoiPhucTaiKhoan,
        permission: [create(resources.NGUOI_DUNG, actions.READ)],
      },
      {
        path: URL.MENU.ROLE, menuName: 'Vai trò', component: Role,
        permission: [create(resources.VAI_TRO, actions.READ)],
      },
    ],
  },
  {
    key: URL.MENU.DANH_MUC,
    menuName: 'Danh mục',
    icon: renderIcon(<ListIcon/>),
    children: [
      {
        path: URL.MENU.DON_VI, menuName: 'Đơn vị', component: DonVi,
        permission: [create(resources.DON_VI, actions.READ)],
      },
    ],
  },

  {
    path: URL.MENU.DU_LIEU_BO_SUNG, menuName: 'Dữ liệu bổ sung',
    component: DuLieuBoSung,
    permission: [create(resources.EXTRA_DATA, actions.READ)],
    icon: renderIcon(<SettingIcon/>),
    hide: true,
  },
  {
    path: URL.MENU.SETTING, menuName: 'Cài đặt hệ thống',
    component: Setting,
    permission: [create(resources.CAI_DAT, actions.READ)],
    icon: renderIcon(<SettingIcon/>),
  },

  // not render in menu
  MY_INFO_ROUTE,
];

export function ConstantsRoutes() {
  return ADMIN_ROUTES;
}
