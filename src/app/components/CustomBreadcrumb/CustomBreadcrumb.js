import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { ConstantsRoutes } from '@app/router/ConstantsRoutes';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { URL } from '@url';
import { cloneObj } from '@app/common/functionCommons';

import * as app from '@app/store/ducks/app.duck';

function CustomBreadcrumb({ locationPathCode, location, token, ...props }) {
  const [breadcrumb, setBreadcrumb] = useState([]);
  const CONSTANTS_ROUTES = ConstantsRoutes();

  useEffect(() => {
    let { pathname } = location;
    Object.entries(URL).forEach(([urlKey, urlValue]) => {
      if (typeof urlValue === 'string') {
        pathname = findPathname(pathname, urlKey, urlValue);
      }
      if (typeof urlValue === 'object') {
        Object.entries(urlValue).forEach(([menuKey, menuValue]) => {
            pathname = findPathname(pathname, menuKey, menuValue);
          },
        );
      }
    });
    props.setLocationPathCode(pathname);
  }, [location.pathname]);

  useEffect(() => {
    renderBreadcrumb();
  }, [locationPathCode]);

  function findPathname(pathname, key, value) {
    let pathReturn = pathname;
    if (key.includes('_ID') && key.indexOf('_ID') === key.length - 3) {
      const valueTemp = value.slice(0, value.length - 3);
      if (pathReturn.includes(valueTemp)) {
        pathReturn = value.format(':id');
      }
    }
    return pathReturn;
  }

  function renderBreadcrumb(routes = CONSTANTS_ROUTES, parents = []) {
    parents = cloneObj(parents);
    return routes.map(route => {
      if (route.path === locationPathCode) {
        let xhtml = [];
        parents.map(parent => {
          xhtml.push(<Breadcrumb.Item key={parent.key || parent.path}>
            {parent.path
              ? <Link to={parent.path}>{parent.breadcrumbName || parent.menuName}</Link>
              : parent.breadcrumbName || parent.menuName}
          </Breadcrumb.Item>);
        });
        xhtml.push(<Breadcrumb.Item key={route.path}>{route.breadcrumbName || route.menuName}</Breadcrumb.Item>);
        setBreadcrumb(xhtml);
      }

      if (Array.isArray(route.children)) {
        return renderBreadcrumb(route.children, [...parents, route]);
      }
    });
  }

  if (!token || location.pathname === URL.MENU.DASHBOARD || !breadcrumb.length) return null;
  return (
    <Breadcrumb style={{ margin: '10px 16px 0 16px' }}>
      <Breadcrumb.Item>
        <Link to={URL.MENU.DASHBOARD}>
          <HomeOutlined/>
        </Link>
      </Breadcrumb.Item>
      {breadcrumb}
    </Breadcrumb>
  );
}

function mapStateToProps(store) {
  const { token, locationPathCode } = store.app;
  return { token, locationPathCode };
}

export default (connect(mapStateToProps, app.actions)(withRouter(CustomBreadcrumb)));
