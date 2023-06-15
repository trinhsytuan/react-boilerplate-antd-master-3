import { put, takeLatest } from 'redux-saga/effects';
import { getAllSetting } from '@app/services/Setting';

export const actionTypes = {
  GetCaiDatHeThong: 'CaiDat/GetCaiDatHeThong',
  SetCaiDatHeThong: 'CaiDat/SetCaiDatHeThong',
};

const initialAuthState = {
  caiDatHeThong: null,
};

export const reducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case actionTypes.SetCaiDatHeThong: {
      const { caiDatHeThong } = action.payload;
      return Object.assign({}, state, { caiDatHeThong });
    }
    default:
      return state;
  }
};

export const actions = {
  getCaiDatHeThong: () => ({ type: actionTypes.GetCaiDatHeThong }),
  setCaiDatHeThong: caiDatHeThong => ({ type: actionTypes.SetCaiDatHeThong, payload: { caiDatHeThong } }),
};

export function* saga() {
  yield takeLatest(actionTypes.GetCaiDatHeThong, function* getCaiDatHeThongSaga() {
    const dataResponse = yield getAllSetting();
    if (dataResponse) {
      yield put(actions.setCaiDatHeThong(dataResponse));
    }
  });
}
