import { authorizePermission } from '@app/rbac/authorizationHelper';
import { ADMIN_ROUTES } from '@app/router/ConstantsRoutes';

export function checkPermission(permissionGranted, path = '') {
  let requiredPermissions = [];
  const pathRequired = path[0] === '/' ? path.substring(1) : path;

  function getRequiredPermissions(item) {
    const permissionPath = item?.path[0] === '/' ? item?.path?.substring(1) : path;
    return permissionPath === pathRequired ? item.permission || [] : [];
  }

  [...ADMIN_ROUTES].forEach(per => {
    if (!per.children && per.path) {
      requiredPermissions = !requiredPermissions.length ? getRequiredPermissions(per) : requiredPermissions;
    } else {
      per.children.forEach(child => {
        requiredPermissions = !requiredPermissions.length ? getRequiredPermissions(child) : requiredPermissions;
      });
    }
  });
  return authorizePermission(permissionGranted, requiredPermissions);
}

