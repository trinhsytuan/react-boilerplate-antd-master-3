import { API } from '@api';
import axios from 'axios';
import { renderMessageError } from '@app/common/functionCommons';
import { convertCamelCaseToSnakeCase, convertSnakeCaseToCamelCase } from '@app/common/dataConverter';

export function getAllSetting() {
  return axios.get(API.SETTING)
    .then(response => {
      if (response.status === 200) return convertSnakeCaseToCamelCase(response?.data?.data);
      return null;
    })
    .catch((err) => {
      renderMessageError(err);
      return null;
    });
}

export function updateSetting(data) {
  return axios.put(API.SETTING, convertCamelCaseToSnakeCase(data))
    .then(response => {
      if (response.status === 200) return convertSnakeCaseToCamelCase(response?.data?.data);
      return null;
    })
    .catch((err) => {
      renderMessageError(err);
      return null;
    });
}


export function uploadFileAndroidApp(file, config = {}) {
  config.headers = { 'content-type': 'multipart/form-data' };
  config.loading = false;
  const formData = new FormData();
  formData.append('file', file);
  return axios.put(API.SETTING_ANDROID_APP, formData, config)
    .then(response => {
      if (response.status === 200) return convertSnakeCaseToCamelCase(response?.data.data);
      return null;
    })
    .catch(err => {
      renderMessageError(err);
      return null;
    });
}

export function uploadFileIosApp(file, config = {}) {
  config.headers = { 'content-type': 'multipart/form-data' };
  config.loading = false;
  const formData = new FormData();
  formData.append('file', file);
  return axios.put(API.SETTING_IOS_APP, formData, config)
    .then(response => {
      if (response.status === 200) return convertSnakeCaseToCamelCase(response?.data.data);
      return null;
    })
    .catch(err => {
      renderMessageError(err);
      return null;
    });
}
