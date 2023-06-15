import { API } from '@api';

import { createBase, deleteByIdBase, getAllPaginationBase, updateBase } from '@app/services/Base';

export function createNotification(data) {
  return createBase(API.NOTIFICATION, data);
}

export function getAllNotification(currentPage = 1, totalDocs = 0, query) {
  return getAllPaginationBase(API.NOTIFICATION, currentPage, totalDocs, query, false);
}

export function updateNotification(data) {
  return updateBase(API.NOTIFICATION_ID, data);
}

export function deleteNotification(id) {
  return deleteByIdBase(API.NOTIFICATION_ID, id);
}
