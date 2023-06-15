import { CONSTANTS } from '@constants';

export default function updateDataStore(type, dataList, dataChanged) {
  let dataListUpdated = [];
  if (type === CONSTANTS.UPDATE) {
    dataListUpdated = dataList.map(dataItem => {
      if (dataItem._id === dataChanged._id) {
        return dataChanged;
      }
      return dataItem;
    });
  }

  if (type === CONSTANTS.DELETE) {
    dataListUpdated = dataList.filter(dataItem => {
      return dataItem._id !== dataChanged._id;
    });
  }

  if (type === CONSTANTS.CREATE) {
    dataListUpdated = [...dataList, dataChanged];
  }
  return dataListUpdated;
}