import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';

import Loading from '@components/Loading';
import TagAction from '@components/TagAction';
import ActionCell from '@components/ActionCell';
import Filter from '@components/Filter';
import AddNewButton from '@AddNewButton';
import CreateOrModifyUser from '@containers/User/CreateOrModifyUser';

import { createUser, deleteUserById, getAllUser, updateUserById } from '@app/services/User';
import { CONSTANTS, EXTRA_FIELD, GENDER_OPTIONS, LOAI_TAI_KHOAN } from '@constants';
import {
  calPageNumberAfterDelete,
  columnIndex,
  convertQueryToObject,
  formatQueryDataExtra,
  handleReplaceUrlSearch,
  paginationConfig,
  renderFilterTreeUnit,
  toast,
} from '@app/common/functionCommons';
import { convertObjectToSnakeCase } from '@app/common/dataConverter';

import * as orgUnit from '@app/store/ducks/orgUnit.duck';
import * as role from '@app/store/ducks/role.duck';

import './User.scss';

function User({ permission, isLoading, userExtraData, orgUnitList, orgUnitTree, myInfo, roleList, ...props }) {
  const [state, setState] = useState({
    isShowModal: false,
    userSelected: null,
  });

  const [userData, setUserData] = useState({
    docs: [],
    currentPage: 1,
    pageSize: 10,
    totalDocs: 0,
    query: {},
  });

  useEffect(() => {
    console.log('roleList', roleList);
    if (!orgUnitList.length) props.getOrgUnit();
    if (!orgUnitTree.length) props.getOrgUnitTree();
    if (!roleList) props.getRole();

    (async () => {
      const { page, limit, ...queryObj } = convertQueryToObject(props.history.location.search);
      await getDataUser(page, limit, queryObj);
    })();
  }, []);

  async function getDataUser(
    currentPage = userData.currentPage,
    pageSize = userData.pageSize,
    query = userData.query,
  ) {
    handleReplaceUrlSearch(props.history, currentPage, pageSize, query);
    const apiResponse = await getAllUser(currentPage, pageSize, query);
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

  function handleShowModal(isShowModal, userSelected = null) {
    if (isShowModal) {
      setState({ isShowModal, userSelected });
    } else {
      setState({ ...state, isShowModal });
    }
  }

  async function createAndModifyUser(type, dataForm) {
    if (type === CONSTANTS.UPDATE) {
      delete dataForm.username;
    }
    const { avatar, chuKy, ...data } = dataForm;
    const dataFormatted = convertObjectToSnakeCase(formatQueryDataExtra(data));
    const formData = new FormData();
    formData.append('json_data', JSON.stringify(dataFormatted));
    if (avatar) formData.append('avatar', avatar);
    if (chuKy) formData.append('chu_ky', chuKy);

    if (type === CONSTANTS.CREATE) {
      formData.append('password', dataForm.password);
      const apiResponse = await createUser(formData);
      if (apiResponse) {
        getDataUser();
        handleShowModal(false);
        toast(CONSTANTS.SUCCESS, 'Tạo mới tài khoản thành công');
      }
    }

    if (type === CONSTANTS.UPDATE) {
      const apiResponse = await updateUserById(state.userSelected._id, formData);
      if (apiResponse) {
        const docs = userData.docs.map(doc => doc._id === apiResponse._id ? { ...doc, ...apiResponse } : doc);
        setUserData(Object.assign({}, userData, { docs }));
        handleShowModal(false);
        toast(CONSTANTS.SUCCESS, 'Chỉnh sửa thông tin tài khoản thành công');
      }
    }
  }

  async function handleDelete(userSelected) {
    const apiResponse = await deleteUserById(userSelected._id);
    if (apiResponse) {
      await getDataUser(calPageNumberAfterDelete(userData));
      toast(CONSTANTS.SUCCESS, 'Xóa tài khoản thành công');
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
    {
      title: 'Hoạt động', dataIndex: 'active', align: 'center', width: 100,
      render: value => (value && <i className="fas fa-check-circle" style={{ fontSize: 20, color: '#87d068' }}/>),
    },
    {
      align: 'center',
      render: (value) => {
        const allowUpdate = permission.update && value.allowUpdate && (value._id !== myInfo._id);
        return <ActionCell
          prefix={<TagAction
            style={{ width: 95 }}
            onClick={() => handleEdit(value)}
            icon={allowUpdate ? <EditOutlined/> : <EyeOutlined/>}
            label={<label style={{ paddingLeft: allowUpdate ? 6 : 3 }}>
              {allowUpdate ? 'Chỉnh sửa' : 'Xem chi tiết'}
            </label>}
            color={allowUpdate ? 'cyan' : 'geekblue'}
          />}
          value={value}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          permission={{ delete: permission.delete }}
          disabledDelete={!value.allowUpdate || (value._id === myInfo._id)}
        />;
      },
      fixed: 'right',
      width: 200,
    },
  ];

  function handleEdit(userSelected) {
    setState({ isShowModal: true, userSelected });
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
        handleFilter={(query) => getDataUser(1, userData.pageSize, query)}
      />

      <AddNewButton onClick={() => handleShowModal(true)} disabled={isLoading} permission={permission}/>
      <Loading active={isLoading}>
        <Table
          size="small"
          bordered
          columns={columns}
          dataSource={userData.docs}
          pagination={paginationConfig(getDataUser, userData)}
          scroll={{ x: 'max-content' }}
        />
      </Loading>
      <CreateOrModifyUser
        permission={{
          ...permission,
          update: permission.update && state.userSelected?.allowUpdate && (state.userSelected?._id !== myInfo._id),
        }}
        userExtraData={userExtraData}
        type={!!state.userSelected ? CONSTANTS.UPDATE : CONSTANTS.CREATE}
        isModalVisible={state.isShowModal}
        handleOk={createAndModifyUser}
        handleCancel={() => handleShowModal(false)}
        userSelected={state.userSelected}
        orgUnitList={orgUnitList}
        orgUnitTree={orgUnitTree}
        roleList={roleList}
      />
    </div>
  );
}

function mapStateToProps(store) {
  const permission = store.user.permissions?.nguoiDung;
  const userExtraData = store.extraData?.[EXTRA_FIELD.User.code];
  const { isLoading } = store.app;
  const { orgUnitList, orgUnitTree } = store.orgUnit;
  const { roleList } = store.role;
  const { myInfo } = store.user;
  return { permission, userExtraData, isLoading, orgUnitList, orgUnitTree, roleList, myInfo };
}

export default (connect(mapStateToProps, { ...orgUnit.actions, ...role.actions })(User));
