import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';

import Loading from '@components/Loading';
import Filter from '@components/Filter';
import AddNewButton from '@AddNewButton';
import CreateOrModifyUnit from './DonViDetail';
import ActionCell from '@components/ActionCell';

import { createUnit, deleteUnit, getAllUnit, updateUnit } from '@app/services/OrgUnit';
import { CONSTANTS, ORG_UNIT_TYPE } from '@constants';
import { calPageNumberAfterDelete, columnIndex, paginationConfig, toast } from '@app/common/functionCommons';
import updateDataStore from '@app/common/updateDataStore';

import * as orgUnit from '@app/store/ducks/orgUnit.duck';

function DonVi({ permission, isLoading, orgUnitList, orgUnitTree, ...props }) {

  const [orgUnitData, setOrgUnitData] = useState({
    docs: [],
    currentPage: 1,
    pageSize: 10,
    totalDocs: 0,
    query: {},
  });

  const [state, setState] = useState({
    isShowModal: false,
    orgUnitSelected: null,
  });

  useEffect(() => {
    (async () => {
      await getDataUnit();
    })();
  }, []);

  useEffect(() => {
    if (!orgUnitList?.length) {
      props.getOrgUnit();
    }
    if (!orgUnitTree?.length) {
      props.getOrgUnitTree();
    }
  }, []);

  async function getDataUnit(
    currentPage = orgUnitData.currentPage,
    pageSize = orgUnitData.pageSize,
    query = orgUnitData.query,
  ) {
    const apiResponse = await getAllUnit(currentPage, pageSize, query);
    if (apiResponse) {
      setOrgUnitData({
        docs: apiResponse.docs,
        totalDocs: apiResponse.totalDocs,
        pageSize: apiResponse.limit,
        currentPage: apiResponse.page,
        query: query,
      });
    }
  }

  function handleShowModal(isShowModal, orgUnitSelected = null) {
    setState({ isShowModal, orgUnitSelected });
  }

  function handleEdit(orgUnitSelected) {
    setState({ isShowModal: true, orgUnitSelected });
  }

  async function handleDelete(orgUnitSelected) {
    const apiResponse = await deleteUnit(orgUnitSelected._id);
    if (apiResponse) {
      await getDataUnit(calPageNumberAfterDelete(orgUnitData));
      toast(CONSTANTS.SUCCESS, 'Xóa đơn vị thành công');
      updateStoreUnit(CONSTANTS.DELETE, apiResponse);
    }
  }

  // function create or modify
  async function createAndModifyUnit(type, dataForm) {
    if (type === CONSTANTS.CREATE) {
      const apiResponse = await createUnit(dataForm);
      if (apiResponse) {
        getDataUnit();
        handleShowModal(false);
        toast(CONSTANTS.SUCCESS, 'Thêm mới đơn vị thành công');
        updateStoreUnit(type, apiResponse);
      }
    }

    if (type === CONSTANTS.UPDATE) {
      dataRequest._id = state.orgUnitSelected._id;
      const apiResponse = await updateUnit(dataRequest);
      if (apiResponse) {
        getDataUnit();
        handleShowModal(false);
        toast(CONSTANTS.SUCCESS, 'Chỉnh sửa thông tin đơn vị thành công');
        updateStoreUnit(type, apiResponse);
      }
    }
  }

  function updateStoreUnit(type, dataResponse) {
    if (!type || !dataResponse || !orgUnitList.length || !orgUnitTree.length) return;
    const unitListUpdated = updateDataStore(type, orgUnitList, dataResponse);
    const unitTreeListUpdated = updateDataStore(type, orgUnitTree, dataResponse);
    props.setOrgUnit(unitListUpdated);
    props.setOrgUnitTree(unitTreeListUpdated);
  }

  function handleChangePagination(current, pageSize) {
    getDataUnit(current, pageSize);
  }

  const dataSource = orgUnitData.docs;

  const columns = [
    columnIndex(orgUnitData.pageSize, orgUnitData.currentPage),
    { title: 'Tên đơn vị', dataIndex: 'tenDonVi', width: 270 },
    { title: 'Mã đơn vị', dataIndex: 'maDonVi', width: 150 },
    {
      title: 'Cấp đơn vị',
      dataIndex: 'capDonVi',
      render: (value) => (Object.values(ORG_UNIT_TYPE).find(orgUnit => orgUnit.value === value)?.label),
      width: 150,
    },
    { title: 'Đơn vị cha', dataIndex: 'donViChaId', render: (value) => value?.tenDonVi, width: 240 },
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

  const pagination = paginationConfig(handleChangePagination, orgUnitData);

  return (
    <div>
      <Filter
        dataSearch={[
          { name: 'tenDonVi', label: 'Tên đơn vị', type: CONSTANTS.TEXT },
          { name: 'maDonVi', label: 'Mã đơn vị', type: CONSTANTS.TEXT },
          {
            name: 'donViChaId', label: 'Đơn vị cha', type: CONSTANTS.SELECT,
            options: { data: orgUnitList, valueString: '_id', labelString: 'tenDonVi' },
          },
        ]}
        layoutCol={{ xs: 24, sm: 24, md: 12, lg: 10, xl: 9, xxl: 9 }}
        labelCol={{}}
        handleFilter={(query) => getDataUnit(1, orgUnitData.pageSize, query)}
      />

      <AddNewButton onClick={() => handleShowModal(true)} disabled={isLoading}/>
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
      <CreateOrModifyUnit
        type={!!state.orgUnitSelected ? CONSTANTS.UPDATE : CONSTANTS.CREATE}
        isModalVisible={state.isShowModal}
        handleOk={createAndModifyUnit}
        handleCancel={() => handleShowModal(false)}
        orgUnitSelected={state.orgUnitSelected}
        permission={permission}
      />
    </div>
  );
}

function mapStateToProps(store) {
  const permission = store.user.permissions?.donVi;
  const { isLoading } = store.app;
  const { orgUnitList, orgUnitTree } = store.orgUnit;
  return { permission, isLoading, orgUnitList, orgUnitTree };
}

export default (connect(mapStateToProps, { ...orgUnit.actions })(DonVi));
