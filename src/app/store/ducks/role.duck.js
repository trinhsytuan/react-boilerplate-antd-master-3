import { put, takeLatest } from 'redux-saga/effects';

import { getAllRole } from '@app/services/Role';

export const actionTypes = {
  GetRole: 'App/GetRole',
  SetRole: 'App/SetRole',
};

const initialState = {
  roleList: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SetRole: {
      const { roleList } = action.payload;
      return Object.assign({}, state, { roleList });
    }
    default:
      return state;
  }
};

export const actions = {
  getRole: () => ({ type: actionTypes.GetRole }),
  setRole: roleList => ({ type: actionTypes.SetRole, payload: { roleList } }),
};

export function* saga() {
  yield takeLatest(actionTypes.GetRole, function* getRoleSaga(data) {
    const dataResponse = yield getAllRole();
    if (dataResponse.length) {
      yield put(actions.setRole(dataResponse));
    }
  });
}
