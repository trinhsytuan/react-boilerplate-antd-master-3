import axios from 'axios';

import { API } from '@api';
import { renderMessageError } from '@app/common/functionCommons';
import { convertSnakeCaseToCamelCase } from '@app/common/dataConverter';
import { getAllPaginationBase } from '@app/services/Base';

export function getAllUserDeleted(currentPage = 1, totalDocs = 0, query, loading) {
  return getAllPaginationBase(API.USER_DA_XOA, currentPage, totalDocs, query, loading);
}

export function restoreUser(id) {
  return axios.post(API.USER_DA_XOA_ID.format(id))
    .then(response => {
      if (response.status === 200) return convertSnakeCaseToCamelCase(response?.data?.data);
      return null;
    })
    .catch((err) => {
      return renderMessageError(err);
    });
}
