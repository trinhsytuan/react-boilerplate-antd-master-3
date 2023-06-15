import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Col, Collapse, Form, Row, Table } from 'antd';
import { connect } from 'react-redux';
import { camelCase } from 'lodash';

import Loading from '@components/Loading';
import CustomModal from '@components/CustomModal';
import CustomSkeleton from '@components/CustomSkeleton';
import TreeUnit from '@components/TreeUnit';
import AnhDinhKem from '@containers/User/AnhDinhKem';

import { CONSTANTS, GENDER_OPTIONS, RULES } from '@constants';
import { ACTIONS, RESOURCES } from '@app/rbac/commons';
import { cloneObj, formatFormDataExtra, formatTypeSkeletonExtraData } from '@app/common/functionCommons';

function CreateOrModifyUser({ myPermissions, isModalVisible, handleOk, handleCancel, userSelected, ...props }) {
  const { userExtraData, permission, roleList, orgUnitTree } = props;
  const [formUser] = Form.useForm();
  const [avatar, setAvatar] = useState(null);
  const [permissionSelected, setPermissions] = useState(null);

  const [stateRerender, setStateRerender] = useState(0);

  useEffect(() => {
    if (isModalVisible) {
      formUser.resetFields();
      if (userSelected) {
        const dataField = formatFormDataExtra(userSelected, userExtraData);
        dataField.donViId = dataField.donViId?._id;
        dataField.vaiTroId = dataField.vaiTroId.map(roleItem => roleItem?._id);
        formUser.setFieldsValue(dataField);
        setPermissions(userSelected.permissions);
      } else {
        setPermissions(null);
        formUser.setFieldsValue({ active: true });
      }
      setStateRerender(stateRerender + 1);
    }
  }, [isModalVisible]);

  function onValuesChange(changedValues) {
  }

  function onFinish(data) {
    if (props.isLoading) return;
    handleOk(userSelected ? CONSTANTS.UPDATE : CONSTANTS.CREATE, {
      ...data,
      avatar,
      permissions: permissionSelected,
    });
  }

  const userSelectedPermissions = Array.isArray(permissionSelected) ? permissionSelected : [];
  const allowChange = (permission.create && !userSelected?._id) || (permission.update && userSelected?._id);

  function handleChangeCheckbox(checked, resourceCode, actionCode) {
    const resourceAction = resourceCode + '#' + actionCode;
    let permissionNew = cloneObj(userSelectedPermissions);
    switch (checked) {
      case true:
        if (actionCode !== 'ALL' && resourceCode === 'ALL') {
          permissionNew = permissionNew.filter(per => !per.includes('#' + actionCode));
        } else if (actionCode === 'ALL' && resourceCode !== 'ALL') {
          permissionNew = permissionNew.filter(per => !per.includes(resourceCode + '#'));
        } else if (actionCode === 'ALL' && resourceCode === 'ALL') {
          permissionNew = [];
        } else {
          permissionNew = permissionNew.filter(per => per !== resourceAction);
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

  return (
    <CustomModal
      width="920px" maskClosable={!allowChange}
      title={userSelected ? 'Cập nhật thông tin người dùng' : 'Thêm mới người dùng'}
      visible={isModalVisible}
      onCancel={handleCancel}
      isLoadingSubmit={props.isLoading}
      isDisabledClose={props.isLoading}
      showFooter={!!allowChange}
      formId="form-user"
    >
      <Loading active={props.isLoading}>
        <Row>
          <Col xs={24} md={18}>
            <Form
              id="form-user" size="default"
              autoComplete="new-password"
              form={formUser}
              onFinish={onFinish}
              onValuesChange={onValuesChange}
            >
              <Row>
                <CustomSkeleton
                  size="default"
                  label="Họ tên" name="hoTen"
                  type={CONSTANTS.TEXT}
                  layoutCol={{ xs: 24 }}
                  labelCol={{ xs: 6, md: 6, lg: 5 }}
                  rules={[RULES.REQUIRED]}
                  form={formUser}
                  showInputLabel={!allowChange}
                />

                <CustomSkeleton
                  size="default"
                  label="Số điện thoại" name="phone"
                  type={CONSTANTS.TEXT}
                  layoutCol={{ xs: 24, md: 12 }}
                  labelCol={{ xs: 6, md: 12, lg: 10 }}
                  rules={[RULES.PHONE]}
                  form={formUser}
                  helpInline={false}
                  showInputLabel={!allowChange}
                />

                <CustomSkeleton
                  size="default" className="pl-md-3"
                  label="Giới tính" name="gender"
                  type={CONSTANTS.SELECT}
                  layoutCol={{ xs: 24, md: 12 }}
                  labelCol={{ xs: 6, md: 7 }}
                  options={{ data: GENDER_OPTIONS }}
                  showInputLabel={!allowChange}
                />

                {!userSelected?.isSystemAdmin && <>
                  <TreeUnit
                    size="default"
                    label="Đơn vị" name="donViId"
                    labelCol={{ xs: 6, md: 6, lg: 5 }}
                    layoutCol={{ xs: 24 }}
                    rules={[RULES.REQUIRED]}
                    showInputLabel={!allowChange}
                    treeData={orgUnitTree}
                  />
                  {allowChange
                    ? <CustomSkeleton
                      size="default"
                      label="Vai trò" name="vaiTroId"
                      labelCol={{ xs: 6, md: 6, lg: 5 }}
                      layoutCol={{ xs: 24 }}
                      type={CONSTANTS.SELECT_MULTI}
                      options={{ data: roleList, labelString: 'name', valueString: '_id' }}
                      rules={[RULES.REQUIRED]}
                      helpInline={false}
                    />
                    : <CustomSkeleton
                      size="default"
                      label="Vai trò"
                      labelCol={{ xs: 6, md: 6, lg: 5 }}
                      layoutCol={{ xs: 24 }}
                      type={CONSTANTS.TEXT}
                      showInputLabel
                      value={userSelected?.vaiTroId.map(role => role.name).join(', ')}
                    />}
                </>}

                <CustomSkeleton
                  size="default"
                  label="Quyền thêm" name="permission"
                  layoutCol={{ xs: 24 }} labelCol={{ xs: 6, md: 6, lg: 5 }}
                  itemClassName="user-permissions"
                >
                  <Collapse ghost className="collapse-permission" expandIconPosition="right">
                    <Collapse.Panel header={`${userSelectedPermissions.length} quyền`} key="1">
                      <Table
                        size="small"
                        className="table-custom-scrollbar"
                        dataSource={cloneObj(RESOURCES).map(resource => {
                          resource.key = resource.code;
                          return resource;
                        })}
                        pagination={false}
                        scroll={{ x: 'max-content', y: 180 }}
                      >
                        <Table.Column
                          title="Chức năng" dataIndex="name" width={120}
                          render={(value, row, index) => RESOURCES[index].description}
                          fixed="left"
                        />
                        {ACTIONS.map(action => {

                          function renderCheckbox(resourceCode, actionCode) {
                            const isChecked = userSelectedPermissions.includes(resourceCode + '#' + actionCode);
                            const allChecked = userSelectedPermissions.length === (ACTIONS.length - 1) * (RESOURCES.length - 1);

                            const actionCheckedList = userSelectedPermissions.filter(per => per.indexOf(`${resourceCode}#`) === 0);
                            const allActionChecked = actionCheckedList.length === (ACTIONS.length - 1);

                            const allResourceChecked = userSelectedPermissions.filter(per => per.includes(`#${actionCode}`)).length === (RESOURCES.length - 1);
                            const checked = isChecked || allActionChecked || allResourceChecked || allChecked;

                            const myPerResource = myPermissions[camelCase(resourceCode)];

                            const showCheckbox = myPerResource[camelCase(actionCode)]
                              || (actionCode === CONSTANTS.ALL
                                && myPerResource[camelCase(CONSTANTS.READ)]
                                && myPerResource[camelCase(CONSTANTS.DELETE)]
                                && myPerResource[camelCase(CONSTANTS.CREATE)]
                                && myPerResource[camelCase(CONSTANTS.UPDATE)]);

                            return <Checkbox
                              key={resourceCode + '#' + actionCode}
                              checked={checked}
                              disabled={!showCheckbox}
                              className={allowChange ? '' : 'disable-checked'}
                              onChange={() => allowChange ? handleChangeCheckbox(checked, resourceCode, actionCode) : null}
                            />;
                          }

                          return <Table.Column
                            key={action.code}
                            title={action.title} dataIndex={action.code}
                            width={80} align="center"
                            render={(value, row, index) => renderCheckbox(RESOURCES[index].code, action.code)}
                          />;
                        })}

                      </Table>
                    </Collapse.Panel>
                  </Collapse>
                </CustomSkeleton>

                <CustomSkeleton
                  size="default"
                  label="Tên tài khoản" name="username"
                  type={CONSTANTS.TEXT}
                  layoutCol={{ xs: 24 }} labelCol={{ xs: 6, md: 6, lg: 5 }}
                  rules={props.type === CONSTANTS.CREATE ? [RULES.REQUIRED, RULES.USERNAME_LENGTH] : []}
                  form={formUser}
                  helpInline={false}
                  showInputLabel={props.type === CONSTANTS.UPDATE || !allowChange}
                />

                {props.type === CONSTANTS.CREATE && <>
                  <CustomSkeleton
                    size="default"
                    label="Mật khẩu" name="password"
                    type={CONSTANTS.PASSWORD}
                    layoutCol={{ xs: 24 }}
                    labelCol={{ xs: 6, md: 6, lg: 5 }}
                    rules={[RULES.REQUIRED, RULES.PASSWORD_FORMAT]}
                    helpInline={false}
                  />

                  <CustomSkeleton
                    size="default"
                    label="Nhập lại mật khẩu" name="rePassword"
                    type={CONSTANTS.PASSWORD}
                    layoutCol={{ xs: 24 }}
                    labelCol={{ xs: 6, md: 6, lg: 5 }}
                    dependencies={['password']}
                    rules={[
                      RULES.REQUIRED,
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject('Không khớp, vui lòng thử lại!');
                        },
                      }),
                    ]}
                    helpInline={false}/>
                </>}

                <CustomSkeleton
                  size="default"
                  label="Email" name="email"
                  type={CONSTANTS.TEXT}
                  layoutCol={{ xs: 24 }} labelCol={{ xs: 6, md: 6, lg: 5 }}
                  rules={[RULES.EMAIL, RULES.REQUIRED]}
                  form={formUser}
                  helpInline={false}
                  showInputLabel={!allowChange}
                />

                <CustomSkeleton
                  size="default"
                  label="Hoạt động" name="active"
                  type={CONSTANTS.SWITCH}
                  layoutCol={{ xs: 24 }} labelCol={{ xs: 6, md: 6, lg: 5 }}
                  showInputLabel={!allowChange}
                  disabled={props.type === CONSTANTS.CREATE}
                />

                {!!userExtraData.length && userExtraData.map((extra) => {
                  const { type, options } = formatTypeSkeletonExtraData(extra);
                  return <CustomSkeleton
                    size="default" key={extra.fieldKey}
                    label={extra.fieldName} name={`extra-${extra.fieldKey}`}
                    layoutCol={{ xs: 24 }} labelCol={{ xs: 6, md: 6, lg: 5 }}
                    type={type}
                    {...options ? { options } : null}
                    disabled={props.isLoading}
                    form={formUser}
                    showInputLabel={!allowChange}
                    allowClear
                    inputReadOnly
                  />;
                })}
              </Row>
            </Form>
          </Col>
          <Col xs={24} md={6}>
            <AnhDinhKem
              allowChange={allowChange}
              avatarUrl={userSelected?.avatar}
              chuKyUrl={userSelected?.chuKyId}
              handleSelectAvatar={setAvatar}
              stateRerender={stateRerender}
            />
          </Col>
        </Row>
      </Loading>
    </CustomModal>
  );
}

function mapStateToProps(store) {
  const { isLoading } = store.app;
  const myPermissions = store.user.permissions;
  return { myPermissions, isLoading };
}

export default (connect(mapStateToProps)(CreateOrModifyUser));
CreateOrModifyUser.propTypes = {
  userExtraData: PropTypes.array,
};
CreateOrModifyUser.defaultProps = {
  userExtraData: [],
};
