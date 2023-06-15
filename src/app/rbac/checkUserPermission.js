import store from '@app/store/store';
import { authorizePermission } from '@app/rbac/authorizationHelper';

export default function checkUserPermission(requiredPermissions) {
  const { userPermissions } = store.getState()?.user?.myInfo;
  return authorizePermission(userPermissions, requiredPermissions);
}
