import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

import ActionCell from '@components/ActionCell';
import Filter from '@components/Filter';
import Loading from '@components/Loading';

import { getAllUserDeleted, restoreUser } from '@app/services/KhoiPhucTaiKhoan';
import { CONSTANTS, EXTRA_FIELD, GENDER_OPTIONS, LOAI_TAI_KHOAN } from '@constants';
import {
  calPageNumberAfterDelete,
  columnIndex,
  convertQueryToObject,
  handleReplaceUrlSearch,
  paginationConfig,
  renderFilterTreeUnit,
  toast,
} from '@app/common/functionCommons';

import * as orgUnit from '@app/store/ducks/orgUnit.duck';

function KhoiPhucTaiKhoan({ permission, isLoading, userExtraData, orgUnitTree, myInfo, ...props }) {
  const [userData, setUserData] = useState({
    docs: [],
    currentPage: 1,
    pageSize: 10,
    totalDocs: 0,
    query: {},
  });

  useEffect(() => {
    if (!orgUnitTree.length) props.getOrgUnitTree();

    (async () => {
      const { page, limit, ...queryObj } = convertQueryToObject(props.history.location.search);
      await getDataDaXoa(page, limit, queryObj);
    })();
  }, []);

  async function getDataDaXoa(
    currentPage = userData.currentPage,
    pageSize = userData.pageSize,
    query = userData.query,
  ) {
    handleReplaceUrlSearch(props.history, currentPage, pageSize, query);
    const apiResponse = await getAllUserDeleted(currentPage, pageSize, query);
    if (apiResponse) {
      setUserData({
        docs: apiResponse.docs,
        totalDocs: apiResponse.totalDocs,
        pageSize: apiResponse.limit,
        currentPage: apiResponse.page,
        query: query,
      });
    }
  }

  async function handleRestoreUser(userSelected) {
    const apiResponse = await restoreUser(userSelected._id);
    if (apiResponse) {
      await getDataDaXoa(calPageNumberAfterDelete(userData));
      toast(CONSTANTS.SUCCESS, 'Khôi phục tài khoản thành công');
    }
  }

  const columns = [
    columnIndex(userData.pageSize, userData.currentPage),
    { title: 'Tên', dataIndex: 'hoTen', width: 150 },
    { title: 'Tên tài khoản', dataIndex: 'username', width: 150 },
    { title: 'Loại tài khoản', dataIndex: 'loaiTaiKhoan', render: (value) => LOAI_TAI_KHOAN[value]?.label, width: 125 },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      render: (value) => GENDER_OPTIONS.find(gender => gender.value === value)?.label,
      width: 80,
    },
    { title: 'Đơn vị', dataIndex: 'donViId', render: value => value?.tenDonVi, width: 200 },
    {
      title: 'Vai trò', dataIndex: 'vaiTroId', width: 150,
      render: value => {
        if (Array.isArray(value)) {
          return value.map(item => {
            return <div key={item._id}>{item?.name}</div>;
          });
        }
      },
    },
    {
      title: 'Quyền thêm', dataIndex: 'permissions', width: 100,
      render: value => {
        if (Array.isArray(value) && value.length) {
          return `${value.length} quyền`;
        }
      },
    },
    { title: 'Số điện thoại', dataIndex: 'phone', width: 120 },
  ];

  if (permission.update) {
    columns.push({
      align: 'center',
      render: (value) => <ActionCell
        value={value}
        handleDelete={handleRestoreUser}
        deleteIcon={<ReloadOutlined/>}
        deleteText="Khôi phục"
        deleteColor="geekblue"
        deleteButtonProps={{ type: 'primary' }}
        title="Khôi phục dữ liệu"
        okText="Xác nhận"
        permission={{ delete: true }}
      />,
      fixed: 'right',
      width: 80,
    });
  }

  return (
    <div>
      <Filter
        dataSearch={[
          { name: 'hoTen', label: 'Họ tên', type: CONSTANTS.TEXT },
          { name: 'donViId', label: 'Đơn vị', render: renderFilterTreeUnit(orgUnitTree) },
          { name: 'email', label: 'Email', type: CONSTANTS.TEXT },
          { name: 'gender', label: 'Giới tính', type: CONSTANTS.SELECT, options: { data: GENDER_OPTIONS } },
        ]}
        handleFilter={(query) => getDataDaXoa(1, userData.pageSize, query)}
      />

      <Loading active={isLoading}>
        <Table
          size="small"
          bordered
          columns={columns}
          dataSource={userData.docs}
          pagination={paginationConfig(getDataDaXoa, userData)}
          scroll={{ x: 'max-content' }}
        />
      </Loading>

    </div>
  );
}

function mapStateToProps(store) {
  const permission = store.user.permissions?.nguoiDung;
  const userExtraData = store.extraData?.[EXTRA_FIELD.User.code];
  const { isLoading } = store.app;
  const { orgUnitTree } = store.orgUnit;
  const { myInfo } = store.user;
  return { permission, userExtraData, isLoading, orgUnitTree, myInfo };
}

export default (connect(mapStateToProps, { ...orgUnit.actions })(KhoiPhucTaiKhoan));
