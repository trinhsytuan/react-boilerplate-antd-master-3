import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import Loading from '@components/Loading';
import LoginRoutes from '@app/router/LoginRoutes';
import NoMatch from '@containers/NoMatch';

import { URL } from '@url';
import { ConstantsRoutes } from '@app/router/ConstantsRoutes';
import { checkPermission } from '@app/rbac/checkPermission';

import '@src/app/common/prototype';

function Routes({ token, myInfo, ...props }) {
  const { userPermissions } = myInfo;

  const CONSTANTS_ROUTES = ConstantsRoutes();

  useEffect(() => {
    if (!token) {
      props.history.push(URL.LOGIN);
    }
  }, [token, props.history]);

  function renderItem({ hide, path, children, component, ...router }) {
    if (hide) return;

    let routeReturn = [];
    if (path) {
      if (checkPermission(userPermissions, path)) {
        routeReturn = [...routeReturn, <Route exact path={path} component={component} key={path}/>];
        routeReturn = [...routeReturn, ...renderSubItem(children)];
      }
    } else if (Array.isArray(children)) {
      routeReturn = children.map((child) => renderItem(child));
    }
    return routeReturn;
  }

  function renderSubItem(children) {
    if (!Array.isArray(children)) return [];
    return children.map((child) => renderItem(child));
  }

  return (
    <Suspense fallback={<Loading/>}>
      {!token && <LoginRoutes/>}

      {token && myInfo?.vaiTroId && <Switch>
        {CONSTANTS_ROUTES.map((route, index) => {
          if (!route.hide) {
            if (route.to) {
              route.to = route.to.charAt(0) !== '/' ? `/${route.to}` : route.to;
            }
            if (route.path) {
              route.path = route.path.charAt(0) !== '/' ? `/${route.path}` : route.path;
            }
            if (route.isRedirect) {
              return <Redirect exact={true} from={route.from} to={route.to} key={index}/>;
            } else {
              return renderItem(route);
            }
          }
        })}
        <Route component={NoMatch}/>
      </Switch>}
    </Suspense>
  );
}

function mapStateToProps(store) {
  const { token } = store.app;
  const { myInfo } = store.user;
  return { token, myInfo };
}

export default (connect(mapStateToProps)(withRouter(Routes)));

