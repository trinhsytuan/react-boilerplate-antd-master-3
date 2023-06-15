import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

import ActionCell from '@components/ActionCell';
import Filter from '@components/Filter';
import Loading from '@components/Loading';
import AddNewButton from '@AddNewButton';
import CreateOrModifyRole from '@containers/Role/CreateOrModifyRole';

import { CONSTANTS } from '@constants';
import {
  calPageNumberAfterDelete,
  columnIndex,
  convertQueryToObject,
  handleReplaceUrlSearch,
  paginationConfig,
  toast,
} from '@app/common/functionCommons';
import { createRole, deleteRole, getAllRole, updateRole } from '@app/services/Role';
import updateDataStore from '@app/common/updateDataStore';

import * as orgUnit from '@app/store/ducks/orgUnit.duck';
import * as role from '@app/store/ducks/role.duck';

function Role({ permission, isLoading, orgUnitList, roleList, ...props }) {
  const [state, setState] = useState({
    isShowModal: false,
    roleSelected: null,
  });

  const [roleData, setRoleData] = useState({
    docs: [],
    currentPage: 1,
    pageSize: 10,
    totalDocs: 0,
    query: {},
  });

  useEffect(() => {
    if (!orgUnitList.length) {
      props.getOrgUnit();
    }
    (async () => {
      const { page, limit, ...queryObj } = convertQueryToObject(props.history.location.search);
      await getDataRole(page, limit, queryObj);
    })();
  }, []);

  async function getDataRole(
    currentPage = roleData.currentPage,
    pageSize = roleData.pageSize,
    query = roleData.query,
  ) {
    handleReplaceUrlSearch(props.history, currentPage, pageSize, query);
    const apiResponse = await getAllRole(currentPage, pageSize, query);
    if (apiResponse) {
      setRoleData({
        docs: apiResponse.docs,
        totalDocs: apiResponse.totalDocs,
        pageSize: apiResponse.limit,
        currentPage: apiResponse.page,
        query: query,
      });
    }
  }

  function handleShowModal(isShowModal, roleSelected = null) {
    if (isShowModal) {
      setState({ isShowModal, roleSelected });
    } else {
      setState({ ...state, isShowModal });
    }
  }

  async function createAndModifyRole(type, dataForm) {

    if (type === CONSTANTS.CREATE) {
      dataRequest.password = dataForm.password;

      const apiResponse = await createRole(dataForm);
      if (apiResponse) {
        getDataRole();
        handleShowModal(false);
        toast(CONSTANTS.SUCCESS, 'Tạo mới vai trò thành công');
        updateStoreRole(type, apiResponse);
      }
    }

    if (type === CONSTANTS.UPDATE) {
      dataRequest._id = state.roleSelected._id;
      const apiResponse = await updateRole(dataRequest);
      if (apiResponse) {
        const docs = roleData.docs.map(doc => {
          if (doc._id === apiResponse._id) {
            doc = apiResponse;
          }
          return doc;
        });
        setRoleData(Object.assign({}, roleData, { docs }));
        handleShowModal(false);
        toast(CONSTANTS.SUCCESS, 'Chỉnh sửa vai trò thành công');
        updateStoreRole(type, apiResponse);
      }
    }
  }

  async function handleDelete(roleSelected) {
    const apiResponse = await deleteRole(roleSelected._id);
    if (apiResponse) {
      await getDataRole(calPageNumberAfterDelete(roleData));
      toast(CONSTANTS.SUCCESS, 'Xóa vai trò thành công');
      updateStoreRole(CONSTANTS.DELETE, apiResponse);
    }
  }

  function updateStoreRole(type, dataResponse) {
    if (!type || !dataResponse || !roleList?.length) return;
    const roleListUpdated = updateDataStore(type, roleList, dataResponse);
    props.setRole(roleListUpdated);
  }

  const dataSource = roleData.docs;
  const columns = [
    columnIndex(roleData.pageSize, roleData.currentPage),
    { title: 'Tên vai trò', dataIndex: 'name', width: 200 },
    { title: 'Mã vai trò', dataIndex: 'code', width: 150 },
    {
      align: 'center',
      render: (value) => <ActionCell
        value={value}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        permission={permission}
      />,
      fixed: 'right',
      width: 200,
    },
  ];

  function handleEdit(roleSelected) {
    setState({ isShowModal: true, roleSelected });
  }

  function handleChangePagination(current, pageSize) {
    getDataRole(current, pageSize);
  }

  const pagination = paginationConfig(handleChangePagination, roleData);

  return (
    <div>
      <Filter
        dataSearch={[
          { name: 'name', label: 'Tên vai trò', type: CONSTANTS.TEXT },
          { name: 'code', label: 'Mã vai trò', type: CONSTANTS.TEXT },
        ]}
        layoutCol={{ xs: 24, sm: 24, md: 12, lg: 10, xl: 9, xxl: 9 }}
        labelCol={{}}
        handleFilter={(query) => getDataRole(1, roleData.pageSize, query)}
      />

      <AddNewButton onClick={() => handleShowModal(true)} disabled={isLoading} permission={permission}/>
      <Loading active={isLoading}>
        <Table
          size="small"
          bordered
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          scroll={{ x: 'max-content' }}
        />
      </Loading>
      <CreateOrModifyRole
        permission={permission}
        type={!!state.roleSelected ? CONSTANTS.UPDATE : CONSTANTS.CREATE}
        isModalVisible={state.isShowModal}
        handleOk={createAndModifyRole}
        handleCancel={() => handleShowModal(false)}
        roleSelected={state.roleSelected}
        orgUnitList={orgUnitList}
      />
    </div>
  );
}

function mapStateToProps(store) {
  const permission = store.user.permissions?.vaiTro;
  const { isLoading } = store.app;
  const { orgUnitList } = store.orgUnit;
  const { roleList } = store.role;
  return { permission, isLoading, orgUnitList, roleList };
}

export default (connect(mapStateToProps, { ...orgUnit.actions, ...role.actions })(Role));
