import { API } from '@api';
import { createBase, deleteByIdBase, getAllBase, updateBase } from '@app/services/Base';

export function getAllTruongDuLieu(query) {
  return getAllBase(API.TRUONG_DU_LIEU, query);
}

export function createTruongDuLieu(data) {
  return createBase(API.TRUONG_DU_LIEU, data);
}

export function updateTruongDuLieu(data) {
  return updateBase(API.TRUONG_DU_LIEU_ID, data);
}

export function deleteTruongDuLieu(id) {
  return deleteByIdBase(API.TRUONG_DU_LIEU_ID, id);
}
