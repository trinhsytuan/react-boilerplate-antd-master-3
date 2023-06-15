import { put, takeLatest } from 'redux-saga/effects';
import Cookies from 'js-cookie';

import { CONSTANTS } from '@constants';
import { URL } from '@url';
import { login } from '@app/services/User';
import { setCookieToken } from '@app/common/functionCommons';

export const actionTypes = {
  ToggleLoading: 'App/ToggleLoading',
  ToggleSider: 'App/ToggleSider',
  ToggleBroken: 'App/ToggleBroken',
  Login: 'App/Login',
  SetToken: 'App/SetToken',
  GetToken: 'App/GetToken',
  ClearToken: 'App/ClearToken',

  SetLocationPathCode: 'App/SetLocationPathCode',
};

const initialAuthState = {
  siderCollapsed: false,
  isBroken: false,
  token: CONSTANTS.INITIAL,
  locationPathCode: null,
};
export const reducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case actionTypes.ToggleLoading: {
      const { isLoading } = action.payload;
      return Object.assign({}, state, { isLoading });
    }
    case actionTypes.ToggleSider: {
      const { siderCollapsed } = action.payload;
      return Object.assign({}, state, { siderCollapsed });
    }
    case actionTypes.ClearToken: {
      Cookies.remove('token');
      localStorage.setItem(window.location.host + 'logout', true);
      return Object.assign({}, state, { token: null });
    }
    case actionTypes.SetToken: {
      const { token } = action.payload;
      setCookieToken(token);
      localStorage.removeItem(window.location.host + 'logout');
      return Object.assign({}, state, { token });
    }
    case actionTypes.GetToken: {
      const token = Cookies.get('token');
      return Object.assign({}, state, { token });
    }
    case actionTypes.SetLocationPathCode: {
      const { locationPathCode } = action.payload;
      return Object.assign({}, state, { locationPathCode });
    }
    default:
      return state;
  }
};

export const actions = {
  toggleLoading: (isLoading) => ({ type: actionTypes.ToggleLoading, payload: { isLoading } }),
  toggleSider: (siderCollapsed) => ({ type: actionTypes.ToggleSider, payload: { siderCollapsed } }),
  login: (data, history) => ({ type: actionTypes.Login, payload: { data, history } }),
  getToken: () => ({ type: actionTypes.GetToken }),
  setToken: (token) => ({ type: actionTypes.SetToken, payload: { token } }),
  clearToken: () => ({ type: actionTypes.ClearToken, payload: { token: null } }),
  setLocationPathCode: (locationPathCode) => ({ type: actionTypes.SetLocationPathCode, payload: { locationPathCode } }),
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga(data) {
    const dataResponse = yield login(data?.payload?.data);
    if (dataResponse) {
      yield put(actions.setToken(dataResponse));
      data?.payload.history.push(URL.MENU.DASHBOARD);
    }
  });
}
