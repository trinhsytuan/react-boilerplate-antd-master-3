import React from 'react';
import { connect } from 'react-redux';
import { Drawer, Layout } from 'antd';

import CustomMenu from '@components/CustomMenu/CustomMenu';
import { SIDER_WIDTH } from '@constants';


function Menu({ token, isBroken, siderCollapsed, isShowDrawer, myInfo, ...props }) {

  if (!token || !myInfo?.vaiTroId) return null;
  return <>
    <Layout.Sider
      width={SIDER_WIDTH}
      breakpoint="lg"
      style={isBroken ? { display: 'none' } : ''}
      trigger={null} theme="light" collapsible={!isBroken} collapsed={siderCollapsed}
      onBreakpoint={broken => props.onBreakpoint(broken)}>
      <CustomMenu toggleCollapsed={props.toggleCollapsed}/>
    </Layout.Sider>

    <Drawer
      placement="left"
      bodyStyle={{ padding: 0 }}
      width={SIDER_WIDTH}
      closable={false}
      onClose={props.toggleCollapsed}
      visible={isShowDrawer}
    >
      <Layout.Sider width={SIDER_WIDTH} trigger={null} theme="light">
        <CustomMenu toggleCollapsed={props.toggleCollapsed}/>
      </Layout.Sider>
    </Drawer>
  </>;
}


function mapStateToProps(store) {
  const { siderCollapsed, token } = store.app;
  const { myInfo } = store.user;
  return { siderCollapsed, token, myInfo };
}

export default (connect(mapStateToProps)(Menu));
