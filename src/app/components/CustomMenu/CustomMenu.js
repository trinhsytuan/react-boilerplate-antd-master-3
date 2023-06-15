import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { connect } from 'react-redux';

import { ConstantsRoutes } from '@app/router/ConstantsRoutes';
import { checkPermission } from '@app/rbac/checkPermission';
import { checkLoaded, formatUnique } from '@app/common/functionCommons';
import EVN_TEXT from '@assets/images/logo/EVN-TEXT.svg';

import * as app from '@app/store/ducks/app.duck';

import './CustomMenu.scss';

function CustomMenu({ siderCollapsed, isBroken, myInfo, locationPathCode, ...props }) {
  const keyRef = useRef([]);
  const [openKeys, setOpenKeys] = useState([]);
  const [pathnameFormat, setPathnameFormat] = useState(null);

  const { userPermissions } = myInfo;

  const CONSTANTS_ROUTES = ConstantsRoutes();

  useEffect(() => {
    if (siderCollapsed) {
      keyRef.current = openKeys;
      setOpenKeys([]);
    } else {
      setOpenKeys(keyRef.current);
    }
  }, [siderCollapsed]);

  useEffect(() => {
    let keys = [...openKeys, ...keyRef.current];
    CONSTANTS_ROUTES.forEach((menu) => {
      if (!menu.hide && menu.menuName && Array.isArray(menu.children)) {
        menu.children.forEach((child) => {
          if (!child.hide && pathnameFormat && [child.key, child.path].includes(pathnameFormat)) {
            keys = formatUnique([...keys, 'path' + (menu.key || menu.path)]);
          }
        });
      }
    });

    if (checkLoaded()) {
      if (siderCollapsed) {
        keyRef.current = keys;
      } else {
        setOpenKeys(keys);
      }
    } else {
      window.onload = function() {
        setOpenKeys(keys);
      };
    }
  }, [pathnameFormat]);

  function handleCheckPermission(permissionGranted, path) {
    return checkPermission(permissionGranted, path);
  }

  function handleActiveMenuForComponentDetail(menu) {
    if (menu.path !== pathnameFormat) {
      if (menu.path === locationPathCode) {
        setPathnameFormat(menu.path);
      }

      if (Array.isArray(menu.children)) {
        menu.children.forEach(child => {
          if (child.path === locationPathCode) {
            setPathnameFormat(menu.path);
          }
        });
      }
    }
  }

  function renderItem(menu) {
    handleActiveMenuForComponentDetail(menu);
    if (menu.hide || !menu.menuName) return;
    let hasPermission = checkPermission(userPermissions, menu.path);
    if (!hasPermission) return;
    return <Menu.Item key={menu.path} icon={menu.icon}>
      <Link to={menu.path}>{menu.menuName}</Link>
    </Menu.Item>;
  }

  function handleTitleClick(value) {
    const { key } = value;
    if (openKeys.includes(key)) {
      setOpenKeys(openKeys.filter(openKey => openKey !== key));
    } else {
      setOpenKeys([...openKeys, key]);
    }
  }

  function renderSubItem(menu) {
    if (menu.hide) return;
    let hasPermission = handleCheckPermission(userPermissions, menu.path);
    if (menu.key) {
      let subMenuHasPermission = 0;
      menu.children.forEach(sub => {
        if (!sub.hide && handleCheckPermission(userPermissions, sub.path)) {
          subMenuHasPermission += 1;
        }
      });
      if (!subMenuHasPermission) {
        hasPermission = false;
      }
    }

    return <Menu.SubMenu
      key={'path' + menu.key}
      title={menu.menuName}
      icon={menu.icon}
      onTitleClick={handleTitleClick}
      disabled={!hasPermission}
    >
      {hasPermission && menu.children.map((child) => {
        if (child.path) {
          return renderItem(child);
        }
        if (child.key && Array.isArray(child.children)) {
          return renderSubItem(child);
        }
      })}
    </Menu.SubMenu>;
  }

  const menuItem = CONSTANTS_ROUTES.map((menu) => {
    if (menu.path) {
      return renderItem(menu);
    }
    if (menu.key && Array.isArray(menu.children)) {
      return renderSubItem(menu);
    }
  });

  return <div style={{ height: '100%', overflow: 'hidden' }}>
    <div className={`sider-logo ${(siderCollapsed && !isBroken) ? 'collapsed' : ''}`}>
      <div className="logo">
        <img src={EVN_TEXT} alt=""/>
      </div>

      {/*<div className="toggle-menu">
        <img src={siderCollapsed ? ARROW_RIGHT : ARROW_LEFT} alt="" onClick={props.toggleCollapsed}/>
      </div>*/}

    </div>
    <div className="custom-scrollbar aside-menu">
      <Menu
        mode="inline" className="main-menu"
        {...siderCollapsed ? {} : { openKeys }}
        selectedKeys={[pathnameFormat]}
        expandIcon={({ isOpen }) => {
          if (!siderCollapsed)
            return <div className="expand-icon">
              <i className={`fa fa-chevron-right ${isOpen ? 'fa-rotate-90' : ''}`} aria-hidden="true"/>
            </div>;
          return null;
        }}
      >
        {menuItem}
      </Menu>
    </div>
  </div>;

}

function mapStateToProps(store) {
  const { siderCollapsed, isBroken, locationPathCode } = store.app;
  const { myInfo } = store.user;
  return { siderCollapsed, isBroken, locationPathCode, myInfo };
}

export default connect(mapStateToProps, app.actions)(CustomMenu);
