import { put, takeLatest } from 'redux-saga/effects';
import { getAllTruongDuLieu } from '@app/services/DuLieuBoSung';
import { EXTRA_FIELD } from '@constants';

export const actionTypes = {
  GetExtraField: 'ExtraField/GetExtraField',
  SetExtraField: 'ExtraField/SetExtraField',
};

const initialState = null;

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SetExtraField: {
      const { extraField } = action.payload;

      Object.entries(extraField).forEach(([key, value]) => {
        extraField[key] = value.sort((a, b) => a.thuTu - b.thuTu);
      });

      return Object.assign({}, state, extraField);
    }
    default:
      return state;
  }
};

export const actions = {
  getExtraData: () => ({ type: actionTypes.GetExtraField }),
  setExtraData: extraField => ({ type: actionTypes.SetExtraField, payload: { extraField } }),
};

export function* saga() {
  yield takeLatest(actionTypes.GetExtraField, function* getExtraFieldSaga() {
    const dataResponse = yield getAllTruongDuLieu();
    if (dataResponse.length) {
      const dataExtra = {};
      Object.keys(EXTRA_FIELD).map(key => dataExtra[key] = []);
      dataResponse.forEach(item => {
        if (dataExtra.hasOwnProperty(item.model)) {
          dataExtra[item.model] = [...dataExtra[item.model], item];
        } else {
          dataExtra[item.model] = [item];
        }
      });
      yield put(actions.setExtraData(dataExtra));
    }
  });

}
