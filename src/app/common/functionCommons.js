import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import React from 'react';
import moment from 'moment';
import { TreeSelect } from 'antd';
import { camelCase, isEqual, isObject, kebabCase, snakeCase, transform } from 'lodash';
import queryString from 'query-string';
import * as toastify from 'react-toastify';

import { CONSTANTS, KIEU_DU_LIEU, PAGINATION_CONFIG, TOAST_MESSAGE } from '@constants';

export function cloneObj(input = {}) {
  return JSON.parse(JSON.stringify(input));
}

function renderQuery(queryInput, queryAdd, firstCharacter) {
  let queryOutput = queryInput ? '&' : firstCharacter;
  queryOutput += queryAdd;
  return queryOutput;
}

export function handleReplaceUrlSearch(history, page, limit, query) {
  const queryObj = cloneObj(query);
  delete queryObj.page;
  delete queryObj.limit;
  let search = '';
  if (page || page === 0) {
    search += search ? '&' : '';
    search += `page=${page}`;
  }
  if (limit || limit === 0) {
    search += search ? '&' : '';
    search += `limit=${limit}`;
  }
  if (Object.values(queryObj).length) {
    search += search.length > 1 ? '&' : '';
    search += convertObjectToQuery(queryObj);
  }
  history.replace({ search });
}

export function convertObjectToQuery(queryObj) {
  let query = '';
  const sortable = Object.fromEntries(
    Object.entries(queryObj).sort(([, a], [, b]) => a - b),
  );
  Object.entries(sortable).forEach(([key, value]) => {
    query += query ? '&' : '';
    query += `${kebabCase(key)}=${value}`;
  });
  return query;
}

export function convertQueryToObject(queryStr) {
  return convertSnakeCaseToCamelCase(queryString.parseUrl(queryStr).query);
}

export function convertParam(queryObj, firstCharacter = '?') {
  if (typeof queryObj !== 'object') return '';
  queryObj = convertObjectToSnakeCase(queryObj);
  let query = '';
  const sortable = Object.fromEntries(
    Object.entries(queryObj).sort(([, a], [, b]) => a - b),
  );
  Object.entries(sortable).forEach(([key, value]) => {
    if (value) {
      if (key === CONSTANTS.POPULATE && Array.isArray(value)) {
        query += query ? '&' : firstCharacter || '';
        query += `${key}=${value.map(x => snakeCase(x))}`;
      } else if (['string', 'boolean'].includes(typeof value) || Array.isArray(value)) {
        query += query ? '&' : firstCharacter || '';
        if (!key.includes(CONSTANTS.HIDDEN.toLowerCase())) {
          query += `${key}=${value}`;
        } else {
          query += value;
        }
      } else if (typeof value === 'object') {
        if (value.hasOwnProperty('lt')) {
          query += renderQuery(query, `${key}<${value.lt}`, firstCharacter);
        }
        if (value.hasOwnProperty('lte')) {
          query += renderQuery(query, `${key}<=${value.lte}`, firstCharacter);
        }
        if (value.hasOwnProperty('gt')) {
          query += renderQuery(query, `${key}>${value.gt}`, firstCharacter);
        }
        if (value.hasOwnProperty('gte')) {
          query += renderQuery(query, `${key}>=${value.gte}`, firstCharacter);
        }
      }
    }
  });
  return query;
}

export function convertFileName(str) {
  if (!str) return '';

  str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');
  str = str.replace(/[èéẹẻẽêềếệểễ]/g, 'e');
  str = str.replace(/[ìíịỉĩ]/g, 'i');
  str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');
  str = str.replace(/[ùúụủũưừứựửữ]/g, 'u');
  str = str.replace(/[ỳýỵỷỹ]/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, 'A');
  str = str.replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, 'E');
  str = str.replace(/[ÌÍỊỈĨ]/g, 'I');
  str = str.replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, 'O');
  str = str.replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, 'U');
  str = str.replace(/[ỲÝỴỶỸ]/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  str = str.replace(/\s+/g, ' ');
  str.trim();
  return str;
}

export function findMax(data) {
  if (!Array.isArray(data) || !data.length) return null;
  let max = typeof data[0] === 'number'
    ? data[0]
    : Array.isArray(data[0]) && data[0][0] ? data[0][0] : 0;
  data.forEach(item => {
    if (typeof item === 'number') {
      max = max < item ? item : max;
    }
    if (Array.isArray(item)) {
      item.forEach(itemChild => {
        max = max < itemChild ? itemChild : max;
      });
    }
  });
  return max;
}

export function setCookieToken(authToken) {
  const tokenDecode = jwtDecode(authToken);
  if (tokenDecode.exp) {
    Cookies.set('token', authToken, { expires: new Date(new Date(tokenDecode.exp * 1000)) });
  }
}

export function randomKey() {
  return Math.floor(Math.random() * 100000000000);
}

export function checkTokenExp(authToken) {
  if (!authToken) return;
  try {
    const exp = jwtDecode(authToken).exp;
    const now = Date.now().valueOf() / 1000;
    return now < exp;
  } catch (e) {
    return null;
  }
}

export function hexToRgb(hex) {
  if (!hex) return null;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return result ? `rgb(${r}, ${g}, ${b})` : null;
}

export function getMessageError(err, method) {
  if (err && err.message === CONSTANTS.CANCEL) return null;
  return (err && err.response && err.response.data && err.response.data.message)
    ? err.response.data.message
    : TOAST_MESSAGE.ERROR[method];
}

export function renderMessageError(err, method) {
  if (err && err.message === CONSTANTS.CANCEL) return null;
  const errorMethod = method || err?.response?.config?.method || CONSTANTS.DEFAULT;
  const messageString = err?.response?.data?.message || TOAST_MESSAGE.ERROR[errorMethod] || TOAST_MESSAGE.ERROR.DEFAULT;
  toast(CONSTANTS.ERROR, messageString, TOAST_MESSAGE.ERROR.DESCRIPTION);
}

//
export function toast(type, label = '', requiredId = false) {
  if (!type) return;

  const toastifyOptions = {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  };

  if (requiredId) {
    toastifyOptions.toastId = label;
  }

  const toastMessage = <>
    {TOAST_MESSAGE.ICON[type]}
    <div
      className="float-left d-flex"
      style={{
        width: '246px',
        paddingLeft: '10px',
        minHeight: '24px',
      }}>
      <label className="my-auto">{label}</label>
    </div>
  </>;

  toastify.toast[type.toLowerCase()](toastMessage, toastifyOptions);
}

export function columnIndex(pageSize, currentPage) {
  return {
    title: 'STT',
    align: 'center',
    render: (value, row, index) => (index + 1) + (pageSize * (currentPage - 1)),
    width: 50,
  };
}

export function difference(object, base) {
  return transform(object, (result, value, key) => {
    if (!isEqual(value, base[key])) {
      result[key] = isObject(value) && isObject(base[key]) ? difference(value, base[key]) : value;
    }
  });
}

export function formatMoment(dateTime) {
  try {
    return dateTime && moment(new Date(dateTime)).isValid() ? moment(new Date(dateTime)) : '';
  } catch (e) {
    return null;
  }
}

export function formatDate(dateTime) {
  try {
    return dateTime && moment(dateTime).isValid() ? moment(dateTime).format('DD/MM/YYYY') : '';
  } catch (e) {
    return null;
  }
}

export function formatDateTime(dateTime) {
  try {
    return dateTime ? moment(dateTime).format('DD/MM/YYYY HH:mm') : '';
  } catch (e) {
    return null;
  }
}

export function formatTimeDate(dateTime) {
  try {
    return dateTime && moment(dateTime).isValid() ? moment(dateTime).format('HH:mm DD/MM/YYYY') : '';
  } catch (e) {
    return null;
  }
}

export function capitalizeFirstLetter(string) {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function formatQueryOneDay(time) {
  const gte = moment(time).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const lt = moment(gte).add({ days: 1 });
  return { gte: gte.toISOString(), lt: lt.toISOString() };
}

export function paginationConfig(onChange, state, paginationConfig = PAGINATION_CONFIG) {
  const pagination = Object.assign({}, paginationConfig);
  if (onChange) {
    pagination.onChange = onChange;
  }
  if (state) {
    pagination.current = state.currentPage;
    pagination.total = state.totalDocs;
    pagination.pageSize = state.pageSize;
  }
  return pagination;
}

export function formatUnique(arr) {
  return Array.from(new Set(arr)); //
}

export function calPageNumberAfterDelete({ docs, currentPage }) {
  if (!Array.isArray(docs) || !currentPage || currentPage === 1) return 1;
  return docs.length === 1 ? currentPage - 1 : currentPage;
}

export function renderTreeNode(children) {
  if (!Array.isArray(children)) return null;
  return children.map(child => {
    return <TreeSelect.TreeNode
      key={child.key}
      value={child._id}
      title={child?.tenDonVi}
      selectable={child?.selectable}
    >
      {renderTreeNode(child.children)}
    </TreeSelect.TreeNode>;
  });
}

export function renderFilterTreeUnit(orgUnitTree, defaultValue) {
  if (!Array.isArray(orgUnitTree) || !orgUnitTree) return;

  return <TreeSelect
    size="small" showSearch
    style={{ width: '100%' }}
    className="select-label"
    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
    placeholder="Tất cả đơn vị"
    treeDefaultExpandAll
    allowClear
    filterOption={(input, option) => removeAccents(option.title?.toLowerCase()).includes(removeAccents(input.toLowerCase()))}
    {...defaultValue ? { defaultValue } : null}
  >
    {renderTreeNode(orgUnitTree)}
  </TreeSelect>;
}

export function checkLoaded() {
  return document.readyState === 'complete';
}

export function formatFormDataExtra(dataInput = {}, modelExtraData = []) {
  const dataOutput = cloneObj(dataInput);
  if (dataOutput.extra) {
    Object.entries(dataOutput.extra).forEach(([key, value]) => {
      const fieldType = modelExtraData.find(extra => extra.fieldKey === key)?.fieldType;
      switch (fieldType) {
        case KIEU_DU_LIEU.VAN_BAN.code:
          dataOutput[`extra-${key}`] = value;
          break;
        case KIEU_DU_LIEU.THOI_GIAN.code:
          dataOutput[`extra-${key}`] = formatMoment(value);
          break;
        case KIEU_DU_LIEU.DANH_SACH.code:
          dataOutput[`extra-${key}`] = value?._id || value;
          break;
        default:
          break;
      }
    });
    delete dataOutput.extra;
  }
  return dataOutput;
}

export function formatQueryDataExtra(dataInput) {
  const dataOutput = { ...dataInput };
  Object.entries(dataOutput).forEach(([key, value]) => {
    if (key.includes('extra-')) {
      const extraFieldKey = key.substring(key.indexOf('-') + 1);
      if (dataOutput.hasOwnProperty('extra')) {
        dataOutput.extra[extraFieldKey] = value;
      } else {
        dataOutput.extra = { [extraFieldKey]: value };
      }
      delete dataOutput[key];
    }
  });
  return dataOutput;
}

export function formatTypeSkeletonExtraData(extra) {
  let type = null, options = null;
  switch (extra.fieldType) {
    case KIEU_DU_LIEU.VAN_BAN.code:
      type = CONSTANTS.TEXT;
      break;
    case KIEU_DU_LIEU.THOI_GIAN.code:
      type = CONSTANTS.DATE;
      break;
    case KIEU_DU_LIEU.DANH_SACH.code:
      type = CONSTANTS.SELECT;
      options = { data: extra.fieldOptions };
      break;
    default:
      break;
  }
  return { type, options };
}

export function checkIsValidDate(date) {
  return moment(new Date(parseInt(date))).isValid() ? moment(new Date(parseInt(date))) : '';
}

function replaceCommaToDot(input) {
  if (!input) return input;
  const stringInput = input.toString();
  return stringInput.replace(',', '.');
}

export function secondsToHms(d) {
  d = Number(d);
  let h = ~~(d / 3600);
  let m = ~~(d % 3600 / 60);
  let s = ~~(d % 3600 % 60);

  let hDisplay = h > 0 ? h + ' giờ ' : '';
  let mDisplay = m > 0 ? m + ' phút ' : '';
  let sDisplay = s > 0 ? s + ' giây' : '';
  return hDisplay + mDisplay + sDisplay;
}

export const getFileExtension = (filename) => {
  let ext = /^.+\.([^.]+)$/.exec(filename);
  return ext === null ? '' : ext[1];
};

export function removeAccents(str) {
  const AccentsMap = [
    'aàảãáạăằẳẵắặâầẩẫấậ',
    'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
    'dđ', 'DĐ',
    'eèẻẽéẹêềểễếệ',
    'EÈẺẼÉẸÊỀỂỄẾỆ',
    'iìỉĩíị',
    'IÌỈĨÍỊ',
    'oòỏõóọôồổỗốộơờởỡớợ',
    'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
    'uùủũúụưừửữứự',
    'UÙỦŨÚỤƯỪỬỮỨỰ',
    'yỳỷỹýỵ',
    'YỲỶỸÝỴ',
  ];

  for (let i = 0; i < AccentsMap.length; i++) {
    const re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
    const char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
}

export function validURL(str) {
  let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(str);
}

export function renderURL(urlString) {
  if (!urlString.startsWith('https://') && !urlString.startsWith('http://')) {
    return `https://${urlString}`;
  }
  return urlString;
}
