import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { URL } from '@url';
import '@src/app/common/prototype';
import Loading from '@components/Loading';

const ResetPassword = lazy(() => import('@containers/Authenticator/ResetPassword/index'));
const ForgetPassword = lazy(() => import('@containers/Authenticator/ForgetPassword/index'));

const Login = lazy(() => import('@components/../containers/Authenticator/Login/Login'));


const LoginRoutes = (props) => {

  return (<Switch>
      <Route exact={true} path={URL.LOGIN} component={Login}/>
      <Route exact={true} path={URL.FORGET_PASSWORD} component={ForgetPassword}/>
      <Route exact={true} path={URL.RESET_PASSWORD} component={ResetPassword}/>
      <Redirect to={URL.LOGIN}/>
    </Switch>
  );
};


export default withRouter(LoginRoutes);
