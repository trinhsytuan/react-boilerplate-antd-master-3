import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Form, Row, Tabs } from 'antd';
import { SaveFilled } from '@ant-design/icons';
import moment from 'moment';

import CustomSkeleton from '@components/CustomSkeleton';
import DropzoneImage from '@components/DropzoneImage';

import { CONSTANTS, GENDER_OPTIONS, LOAI_TAI_KHOAN, RULES } from '@constants';
import { cloneObj, toast } from '@app/common/functionCommons';
import { convertObjectToSnakeCase } from '@app/common/dataConverter';
import { requestChangePassword } from '@app/services/User';

import * as user from '@app/store/ducks/user.duck';
import * as app from '@app/store/ducks/app.duck';

function MyInfo({ myInfo, isLoading, roleList, ...props }) {
  const [formInfo] = Form.useForm();
  const [formChangePassword] = Form.useForm();
  const [avatarTemp, setAvatarTemp] = useState(null);

  React.useEffect(() => {
    if (myInfo) {
      const dataField = cloneObj(myInfo);
      dataField.vaiTroId = dataField?.vaiTroId?.map(roleItem => roleItem?.name);
      dataField.birthday = dataField?.birthday ? moment(dataField.birthday) : '';
      dataField.tenDonVi = dataField?.donViId?.tenDonVi;
      formInfo.setFieldsValue(dataField);
      if (avatarTemp) setAvatarTemp(null);
    }
  }, [myInfo]);

  function handleUpdateMyInfo({ hoTen, gender, email, phone }) {
    const formData = new FormData();
    formData.append('json_data', JSON.stringify(convertObjectToSnakeCase({ hoTen, gender, email, phone })));
    if (avatarTemp) formData.append('avatar', avatarTemp);
    props.updateMyInfo(formData);
  }

  async function handleChangePassword({ oldPassword, newPassword }) {
    const apiResponse = await requestChangePassword({ oldPassword, newPassword });
    if (apiResponse) {
      toast(CONSTANTS.SUCCESS, 'Thay đổi mật khẩu thành công');
      formChangePassword.resetFields();
    }
  }

  function onValuesChange(changedValues, allValues) {
    const { newPassword } = changedValues;
    if (newPassword && allValues?.confirmPassword) {
      formInfo.validateFields(['confirmPassword']);
    }
  }

  function handleSelectAvatar(files) {
    setAvatarTemp(files);
  }

  return (
    <div>
      <Tabs size="small">
        <Tabs.TabPane tab="Thông tin cá nhân" key="1">
          <Row>
            <Col sm={18}>
              <Form form={formInfo} id="form-info" autoComplete="off" onFinish={handleUpdateMyInfo}>
                <Row gutter={15}>
                  {myInfo.loaiTaiKhoan === LOAI_TAI_KHOAN.TAI_KHOAN_HE_THONG.value &&
                    <CustomSkeleton
                      size="default"
                      label="Tên đăng nhập" name="username"
                      type={CONSTANTS.TEXT}
                      labelCol={{ xs: 8 }}
                      layoutCol={{ xs: 24 }}
                      showInputLabel
                    />}
                  {myInfo.loaiTaiKhoan === LOAI_TAI_KHOAN.TAI_KHOAN_HRMS.value &&
                    <CustomSkeleton
                      size="default"
                      label="Tài khoản HRMS" name="hrmsAccount"
                      type={CONSTANTS.TEXT}
                      labelCol={{ xs: 8 }}
                      layoutCol={{ xs: 24 }}
                      showInputLabel
                    />}
                  <CustomSkeleton
                    size="default"
                    label="Họ tên" name="hoTen"
                    type={CONSTANTS.TEXT}
                    labelCol={{ xs: 8 }}
                    layoutCol={{ xs: 24 }}
                    rules={[RULES.REQUIRED]}
                    disabled={isLoading}
                    showInputLabel={myInfo.loaiTaiKhoan === LOAI_TAI_KHOAN.TAI_KHOAN_HRMS.value}
                    form={formInfo}
                  />
                  <CustomSkeleton
                    size="default"
                    label="Giới tính" name="gender"
                    type={CONSTANTS.SELECT}
                    options={{ data: GENDER_OPTIONS }}
                    labelCol={{ xs: 8 }}
                    layoutCol={{ xs: 24 }}
                    disabled={isLoading}
                  />
                  <CustomSkeleton
                    size="default"
                    label="Email" name="email"
                    type={CONSTANTS.TEXT}
                    rules={[RULES.EMAIL, RULES.REQUIRED]}
                    labelCol={{ xs: 8 }}
                    layoutCol={{ xs: 24 }}
                    disabled={isLoading}
                    showInputLabel={myInfo.loaiTaiKhoan === LOAI_TAI_KHOAN.TAI_KHOAN_HRMS.value}
                    form={formInfo}
                  />
                  <CustomSkeleton
                    size="default"
                    label="Điện thoại" name="phone"
                    type={CONSTANTS.TEXT}
                    labelCol={{ xs: 8 }}
                    layoutCol={{ xs: 24 }}
                    rules={[RULES.PHONE]}
                    disabled={isLoading}
                    helpInline={false}
                  />

                  <CustomSkeleton
                    size="default"
                    label="Vai trò" name="vaiTroId"
                    labelCol={{ xs: 8 }}
                    layoutCol={{ xs: 24 }}
                    type={CONSTANTS.SELECT_MULTI}
                    options={{ data: roleList, labelString: 'name', valueString: 'name' }}
                    showInputLabel
                  />

                  <CustomSkeleton
                    size="default"
                    label="Đơn vị" name="tenDonVi"
                    labelCol={{ xs: 8 }}
                    layoutCol={{ xs: 24 }}
                    type={CONSTANTS.TEXT}
                    showInputLabel
                  />
                </Row>
              </Form>
            </Col>
            <Col sm={6}>
              <div className="attach-image">
                <div className="attach-image__title">
                  Ảnh đại diện
                </div>
                <div className="attach-image__img">
                  <DropzoneImage
                    width={38 * 5}
                    height={38 * 5}
                    imgUrl={myInfo.avatar}
                    handleDrop={handleSelectAvatar}
                    stateRerender={myInfo.avatar}
                  />
                </div>
              </div>
            </Col>

            <Col xs={24}>
              <Button
                htmlType="submit"
                form="form-info"
                type="primary" className="float-right"
                icon={<SaveFilled/>}
                disabled={isLoading}>
                Lưu
              </Button>
            </Col>

          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Đổi mật khẩu" key="2">
          <Form form={formChangePassword} autoComplete="off" onFinish={handleChangePassword}
                onValuesChange={onValuesChange}>
            <Row gutter={15}>
              <CustomSkeleton
                size="default"
                label="Mật khẩu cũ" name="oldPassword"
                type={CONSTANTS.PASSWORD}
                rules={[RULES.REQUIRED]}
                layoutCol={{ xs: 24 }} labelCol={{ xs: 8 }}
                disabled={isLoading}
                helpInline={false}
              />
              <CustomSkeleton
                size="default"
                label="Mật khẩu mới" name="newPassword"
                type={CONSTANTS.PASSWORD}
                layoutCol={{ xs: 24 }} labelCol={{ xs: 8 }}
                rules={[RULES.REQUIRED, RULES.PASSWORD_FORMAT]}
                disabled={isLoading}
                helpInline={false}
              />
              <CustomSkeleton
                size="default"
                label="Xác nhận mật khẩu mới" name="confirmPassword"
                layoutCol={{ xs: 24 }} labelCol={{ xs: 8 }}
                type={CONSTANTS.PASSWORD}
                helpInline={false}
                rules={[RULES.REQUIRED,
                  ({ getFieldValue }) => ({
                    validator(rule, confirmPassword) {
                      if (confirmPassword && getFieldValue('newPassword') !== confirmPassword) {
                        return Promise.reject('Mật khẩu mới không trùng khớp');
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
                disabled={isLoading}
                form={formInfo}
              />

              <Col xs={24}>
                <Button
                  htmlType="submit"
                  type="primary" className="float-right"
                  icon={<SaveFilled/>}
                  disabled={isLoading}>
                  Lưu
                </Button>
              </Col>
            </Row>
          </Form>
        </Tabs.TabPane>
      </Tabs>

    </div>


  );
}

function mapStateToProps(store) {
  const { myInfo } = store.user;
  const { isLoading } = store.app;
  return { isLoading, myInfo };
}

export default (connect(mapStateToProps, { ...app.actions, ...user.actions })(MyInfo));
