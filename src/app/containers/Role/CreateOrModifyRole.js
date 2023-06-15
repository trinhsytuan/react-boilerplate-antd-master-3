import React, { useEffect, useState } from 'react';
import { Checkbox, Col, Divider, Form, Row, Table } from 'antd';
import { connect } from 'react-redux';
import { camelCase } from 'lodash';

import Loading from '@components/Loading';
import CustomModal from '@components/CustomModal';
import CustomSkeleton from '@components/CustomSkeleton';

import { ACTIONS, RESOURCES } from '@app/rbac/commons';
import { CONSTANTS, RULES } from '@constants';
import { cloneObj } from '@app/common/functionCommons';

function CreateOrModifyRole({ myPermissions, permission, orgUnitList, ...props }) {
  const { isModalVisible, handleOk, handleCancel, roleSelected } = props;
  const [formRole] = Form.useForm();
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (isModalVisible) {
      formRole.resetFields();
      setPermissions([]);
      if (roleSelected) {
        setPermissions(roleSelected.permissions);
        const dataField = cloneObj(roleSelected);
        formRole.setFieldsValue(dataField);
      }
    }
  }, [isModalVisible]);

  function onFinish(data) {
    if (props.isLoading) return;
    handleOk(roleSelected ? CONSTANTS.UPDATE : CONSTANTS.CREATE, { ...data, ...{ permissions } });
  }

  function renderCheckbox(resourceCode, actionCode, disabled = false) {
    const isChecked = permissions.includes(resourceCode + '#' + actionCode);
    const allChecked = permissions.length === (ACTIONS.length - 1) * (RESOURCES.length - 1);

    const actionCheckedList = permissions.filter(permission => permission.indexOf(`${resourceCode}#`) === 0);
    const allActionChecked = actionCheckedList.length === (ACTIONS.length - 1);

    const allResourceChecked = permissions.filter(permission => permission.includes(`#${actionCode}`)).length === (RESOURCES.length - 1);
    const checked = isChecked || allActionChecked || allResourceChecked || allChecked;
    return <Checkbox
      key={resourceCode + '#' + actionCode}
      disabled={disabled}
      checked={checked}
      className={(allowChange && !disabled) ? '' : 'disable-checked'}
      onChange={() => allowChange ? handleChangeCheckbox(checked, resourceCode, actionCode) : null}
    />;
  }

  function handleChangeCheckbox(checked, resourceCode, actionCode) {
    const resourceAction = resourceCode + '#' + actionCode;
    let permissionNew = cloneObj(permissions);
    switch (checked) {
      case true:
        if (actionCode !== 'ALL' && resourceCode === 'ALL') {
          permissionNew = permissionNew.filter(permission => !permission.includes('#' + actionCode));
        } else if (actionCode === 'ALL' && resourceCode !== 'ALL') {
          permissionNew = permissionNew.filter(permission => !permission.includes(resourceCode + '#'));
        } else if (actionCode === 'ALL' && resourceCode === 'ALL') {
          permissionNew = [];
        } else {
          permissionNew = permissionNew.filter(permission => permission !== resourceAction);
        }
        break;
      case false:
        if (actionCode !== 'ALL' && resourceCode === 'ALL') {
          RESOURCES.forEach(resource => {
            if (resource.code !== 'ALL') {
              permissionNew = [...permissionNew, resource.code + '#' + actionCode];
            }
          });
        } else if (actionCode === 'ALL' && resourceCode !== 'ALL') {
          ACTIONS.forEach(action => {
            if (action.code !== 'ALL') {
              permissionNew = [...permissionNew, resourceCode + '#' + action.code];
            }
          });
        } else if (actionCode === 'ALL' && resourceCode === 'ALL') {
          RESOURCES.map(resource => {
            ACTIONS.forEach(action => {
              if (action.code !== 'ALL' && resource.code !== 'ALL') {
                permissionNew = [...permissionNew, resource.code + '#' + action.code];
              }
            });
          });
        } else {
          permissionNew = [...permissionNew, resourceAction];
        }
        break;
      default:
        break;
    }

    permissionNew = [...new Set(permissionNew)];
    setPermissions(permissionNew);
  }

  const columns = [
    { title: 'Chức năng', dataIndex: 'name', render: (value, row, index) => RESOURCES[index].description },
  ];
  ACTIONS.forEach(action => {
    columns.push({
      align: 'center',
      title: action.title,
      dataIndex: action.code,
      render: (value, row, index) => {
        const myPerResource = myPermissions[camelCase(RESOURCES[index].code)];
        const showCheckbox = myPerResource[camelCase(action.code)]
          || (action.code === CONSTANTS.ALL
            && myPerResource[camelCase(CONSTANTS.READ)]
            && myPerResource[camelCase(CONSTANTS.DELETE)]
            && myPerResource[camelCase(CONSTANTS.CREATE)]
            && myPerResource[camelCase(CONSTANTS.UPDATE)]);
        if (showCheckbox) {
          return renderCheckbox(RESOURCES[index].code, action.code);
        } else {
          return renderCheckbox(RESOURCES[index].code, action.code, !showCheckbox);
        }
      },
    });
  });

  const dataSource = cloneObj(RESOURCES).map(resource => {
    resource.key = resource.code;
    return resource;
  });

  const allowChange = (permission.create && !roleSelected?._id) || (permission.update && roleSelected?._id);

  return (
    <CustomModal
      width={1000} maskClosable={false}
      title={allowChange
        ? roleSelected ? 'Cập nhật thông tin vai trò' : 'Thêm mới vai trò'
        : 'Thông tin vai trò'}
      visible={isModalVisible}
      onCancel={handleCancel}
      isLoadingSubmit={props.isLoading}
      isDisabledClose={props.isLoading}
      showFooter={!!allowChange}
    >
      <Loading active={props.isLoading}>
        <Form id="form-modal" form={formRole} autoComplete="new-password" onFinish={onFinish}>
          <Row gutter={15}>
            <CustomSkeleton
              size="default"
              label="Tên vai trò" name="name"
              type={CONSTANTS.TEXT}
              layoutCol={{ xs: 12 }}
              labelCol={{ xs: 8 }}
              rules={[RULES.REQUIRED]}
              showInputLabel={!allowChange}
              form={formRole}
            />

            <CustomSkeleton
              size="default"
              label="Mã vai trò" name="code"
              type={CONSTANTS.TEXT}
              layoutCol={{ xs: 12 }}
              labelCol={{ xs: 8 }}
              rules={[RULES.REQUIRED]}
              showInputLabel={!allowChange}
              form={formRole}
            />

            <Col xs={24}>
              <Divider orientation="left">Phân quyền cho vai trò</Divider>
              <Table columns={columns} dataSource={dataSource} pagination={false} size="small"/>
            </Col>
          </Row>
        </Form>
      </Loading>
    </CustomModal>
  );
}

function mapStateToProps(store) {
  const myPermissions = store.user.permissions;
  const { isLoading } = store.app;
  return { myPermissions, isLoading };
}

export default (connect(mapStateToProps)(CreateOrModifyRole));
