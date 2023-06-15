import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import { DUCKS } from './ducks';

const reducers = {}, sagas = [];

Object.entries(DUCKS).forEach(([key, value]) => {
  reducers[key] = value?.reducer;
  sagas.push(value.saga());
});

const combinedReducer = combineReducers(reducers);

export const rootReducer = (state, action) => {
  if (action.type === 'App/ClearToken') {
    state = undefined;
  }
  return combinedReducer(state, action);
}

export function* rootSaga() {
  yield all(sagas);
}
