import * as app from './app.duck';
import * as user from './user.duck';
import * as orgUnit from './orgUnit.duck';
import * as caiDat from '@app/store/ducks/caiDat.duck';
import * as role from '@app/store/ducks/role.duck';
import * as notification from '@app/store/ducks/notification.duck';
import * as extraField from '@app/store/ducks/extraField.duck';
import * as rerender from '@app/store/ducks/rerender.duck';

export const DUCKS = {
  app,
  user,
  orgUnit,
  caiDat,
  role,
  notification,


  extraData: extraField,
  rerender,
};
