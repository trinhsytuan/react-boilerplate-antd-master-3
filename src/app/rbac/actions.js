import { ACTIONS } from '@app/rbac/commons';

const actions = {};
ACTIONS.map(resource => {
  actions[resource.code] = {
    code: resource.code,
    description: resource.description,
  };
});

export default actions;
