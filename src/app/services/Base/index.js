import axios from 'axios';
import { convertParam, renderMessageError } from '@app/common/functionCommons';
import { convertCamelCaseToSnakeCase, convertSnakeCaseToCamelCase } from '@app/common/dataConverter';

export function createBase(api, data, loading = true) {
  const config = { loading };
  return axios.post(`${api}`, convertCamelCaseToSnakeCase(data), config)
    .then(response => {
      if (response.status === 200) return convertSnakeCaseToCamelCase(response?.data?.data);
      return null;
    })
    .catch((err) => {
      renderMessageError(err);
      return null;
    });
}

export function getAllBase(api, query, loading = true) {
  const config = { loading };
  const params = convertParam(query);
  return axios.get(`${api}${params}`, config)
    .then(response => {
      if (response.status === 200) return convertSnakeCaseToCamelCase(response?.data?.data);
      return null;
    })
    .catch((err) => {
      renderMessageError(err);
      return null;
    });
}

export function getAllPaginationBase(api, currentPage = 1, totalDocs = 0, query, loading = true) {
  const config = { loading };
  const params = convertParam(query, '&');
  return axios.get(`${api}?page=${currentPage}&limit=${totalDocs}${params}`, config)
    .then(response => {
      if (response.status === 200 && Array.isArray(response?.data?.data?.docs)) {
        if (totalDocs) {
          return convertSnakeCaseToCamelCase(response.data.data);
        } else {
          return convertSnakeCaseToCamelCase(response.data.data.docs);
        }
      }
      return null;
    })
    .catch((err) => {
      renderMessageError(err);
      return null;
    });
}

export function getByIdBase(api, id, loading = true) {
  const config = { loading };
  return axios.get(api.format(id), config)
    .then(response => {
      if (response.status === 200) return convertSnakeCaseToCamelCase(response?.data?.data);
      return null;
    })
    .catch(err => {
      renderMessageError(err);
      return null;
    });
}

export function updateBase(api, data, loading = true) {
  const config = { loading };
  return axios.put(api.format(data._id), convertCamelCaseToSnakeCase(data), config)
    .then(response => {
      if (response.status === 200) return convertSnakeCaseToCamelCase(response?.data?.data);
      return null;
    })
    .catch((err) => {
      renderMessageError(err);
      return null;
    });
}

export function deleteByIdBase(api, id, loading = true) {
  const config = { loading };
  return axios.delete(api.format(id), config)
    .then(response => {
      if (response.status === 200) return convertSnakeCaseToCamelCase(response?.data?.data);
      return null;
    })
    .catch((err) => {
      renderMessageError(err);
      return null;
    });
}
