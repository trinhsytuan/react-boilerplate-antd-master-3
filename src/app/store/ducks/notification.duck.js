import { put, takeLatest } from 'redux-saga/effects';
import { getAllNotification } from '@app/services/Notification';

export const actionTypes = {
  GetNotification: 'App/GetNotification',
  SetNotification: 'App/SetNotification',
};

const initialAuthState = {
  notificationList: [],
};

export const reducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case actionTypes.SetNotification: {
      const { notificationList } = action.payload;
      return Object.assign({}, state, { notificationList });
    }
    default:
      return state;
  }
};

export const actions = {
  getNotification: () => ({ type: actionTypes.GetNotification }),
  setNotification: notificationList => ({ type: actionTypes.SetNotification, payload: { notificationList } }),
};

export function* saga() {
  yield takeLatest(actionTypes.GetNotification, function* getNotificationSaga(data) {
    const dataResponse = yield getAllNotification();
    if (dataResponse) {
      yield put(actions.setNotification(dataResponse));
    }
  });
}
