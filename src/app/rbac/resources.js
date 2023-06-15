import { RESOURCES } from '@app/rbac/commons';

const resources = {};
RESOURCES.map(resource => {
  resources[resource.code] = {
    code: resource.code,
    description: resource.description,
  };
});
export default resources;
