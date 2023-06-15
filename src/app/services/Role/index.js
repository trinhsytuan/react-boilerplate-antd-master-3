import { API } from '@api';

import { createBase, deleteByIdBase, getAllPaginationBase, updateBase } from '@app/services/Base';

export function createRole(data) {
  return createBase(API.ROLE, data);
}

export function getAllRole(currentPage = 1, totalDocs = 0, query) {
  return getAllPaginationBase(API.ROLE, currentPage, totalDocs, query);
}

export function updateRole(data) {
  return updateBase(API.ROLE_ID, data);
}

export function deleteRole(id) {
  return deleteByIdBase(API.ROLE_ID, id);
}
