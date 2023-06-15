import axios from 'axios';
import { API } from '@api';
import { convertParam, renderMessageError } from '@app/common/functionCommons';
import { convertSnakeCaseToCamelCase } from '@app/common/dataConverter';
import { createBase, deleteByIdBase, getAllPaginationBase, updateBase } from '@app/services/Base';

export function createUnit(data) {
  return createBase(API.ORG_UNIT, data);
}

export function getAllUnit(currentPage = 1, totalDocs = 0, query) {
  return getAllPaginationBase(API.ORG_UNIT, currentPage, totalDocs, query);
}

export function updateUnit(data) {
  return updateBase(API.ORG_UNIT_ID, data);
}

export function deleteUnit(id) {
  return deleteByIdBase(API.ORG_UNIT_ID, id);
}

export function getOrgUnitTree() {
  const params = convertParam({ tree: 'true' });
  return axios.get(`${API.ORG_UNIT}${params}`)
    .then(response => {
      if (response.status === 200 && Array.isArray(response?.data?.data)) return convertSnakeCaseToCamelCase(response.data.data);
      return null;
    })
    .catch((err) => {
      renderMessageError(err);
      return null;
    });
}
