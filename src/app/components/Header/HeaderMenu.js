import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Dropdown, Layout, Menu } from 'antd';

// import Notifications from './Notifications';
import { API } from '@api';
import { URL } from '@url';

import * as app from '@app/store/ducks/app.duck';
import * as user from '@app/store/ducks/user.duck';

import './Header.less';

import ARROW_LEFT from '@assets/images/icon/arrow-left.svg';
import ARROW_RIGHT from '@assets/images/icon/arrow-right.svg';
import USER from '@assets/images/icon/user.svg';

function HeaderMenu({ token, history, caiDatHeThong, myInfo, isBroken, siderCollapsed, ...props }) {
  if (!token) return null;
  const [isAvatarLoader, setAvatarLoader] = useState(false);

  const { pathname } = history.location;
  const { toggleCollapsed } = props;

  const menu = (
    <Menu selectedKeys={pathname}>
      <Menu.Item key={URL.THONG_TIN_CA_NHAN}>
        <Link to={URL.THONG_TIN_CA_NHAN}>Thông tin cá nhân</Link>
      </Menu.Item>
      <Menu.Item onClick={() => props.clearToken()}>Đăng xuất</Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header className="site-layout-background position-relative" size="small"
                   style={{ padding: 0, position: 'sticky', top: 0, left: 0, right: 0, zIndex: 2 }}>
      <span className="toggle-menu">
        <img src={siderCollapsed ? ARROW_RIGHT : ARROW_LEFT} alt="" onClick={toggleCollapsed}/>
      </span>
      <span className="toggle-drawer-menu">
        <img src={ARROW_RIGHT} alt="" onClick={toggleCollapsed}/>
      </span>

      <div className="header-action" style={{ width: 'unset' }}>
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" arrow>
          <div className="my-info-container">
            <div className="my-info__avatar">
              {myInfo.avatar
                && <img onLoad={() => setAvatarLoader(true)} src={API.PREVIEW_ID.format(myInfo.avatar)}
                        style={{ borderRadius: '12px', display: isAvatarLoader ? 'block' : 'none' }} alt=""/>}
              {(!isAvatarLoader || !myInfo?.avatar) && <img src={USER} alt=""/>}
              <span className="my-info__name">{myInfo.hoTen}</span>
            </div>
          </div>
        </Dropdown>

        {/*<Notifications/>*/}
      </div>
    </Layout.Header>
  );
}

function mapStateToProps(store) {
  const { siderCollapsed, isBroken, token } = store.app;
  const { myInfo } = store.user;
  const { caiDatHeThong } = store.caiDat;
  return { siderCollapsed, isBroken, token, myInfo, caiDatHeThong };
}

export default (connect(mapStateToProps, { ...app.actions, ...user.actions })(withRouter(HeaderMenu)));
