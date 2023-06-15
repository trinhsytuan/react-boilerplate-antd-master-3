import React, { useEffect, useState } from 'react';
import { Form, Row } from 'antd';
import { connect } from 'react-redux';

import Loading from '@components/Loading';
import CustomSkeleton from '@components/CustomSkeleton';
import CustomModal from '@components/CustomModal';

import { CONSTANTS, ORG_UNIT_TYPE, RULES } from '@constants';

import * as orgUnit from '@app/store/ducks/orgUnit.duck';

function DonViDetail({ permission, isModalVisible, handleOk, handleCancel, orgUnitSelected, ...props }) {
  const [formDonVi] = Form.useForm();
  const [parentKey, setParentKey] = useState(false);

  useEffect(() => {
    if (orgUnitSelected && isModalVisible) {
      orgUnitSelected.donViChaId = orgUnitSelected?.donViChaId?._id;
      const capDonVi = Object.values(ORG_UNIT_TYPE).find(orgUnitType => orgUnitType.value === orgUnitSelected.capDonVi);
      setParentKey(capDonVi?.parentKey);
      formDonVi.setFieldsValue(orgUnitSelected);
    } else if (!isModalVisible) {
      formDonVi.resetFields();
      setParentKey(false);
    }
  }, [isModalVisible]);

  function onFinish(data) {
    if (props.isLoading) return;
    handleOk(orgUnitSelected ? CONSTANTS.UPDATE : CONSTANTS.CREATE, data);
  }

  function handleChangeOrgUnitType(value, option) {
    if (parentKey !== option?.extra?.parentKey) {
      setParentKey(option?.extra?.parentKey);
      formDonVi.resetFields(['donViChaId']);
    }
  }

  return (
    <CustomModal
      width={720} maskClosable={false}
      title={orgUnitSelected?._id
        ? permission.update ? 'Cập nhật thông tin đơn vị' : 'Chi tiết thông tin đơn vị'
        : 'Thêm mới đơn vị'}
      visible={isModalVisible}
      onCancel={handleCancel}
      formId="form-don-vi"
      isLoadingSubmit={props.isLoading}
      isDisabledClose={props.isLoading}
    >
      <Loading active={props.isLoading}>
        <Form id="form-don-vi" form={formDonVi} size="default" onFinish={onFinish}>
          <Row gutter={15}>
            <CustomSkeleton
              size="default"
              label="Tên đơn vị" name="tenDonVi"
              type={CONSTANTS.TEXT}
              layoutCol={{ xs: 24 }}
              labelCol={{ xs: 7 }}
              rules={[RULES.REQUIRED]}
              form={formDonVi}
            />
            <CustomSkeleton
              size="default"
              label="Mã đơn vị" name="maDonVi"
              type={CONSTANTS.TEXT}
              layoutCol={{ xs: 24 }}
              labelCol={{ xs: 7 }}
              rules={[RULES.REQUIRED]}
              form={formDonVi}
            />
            <CustomSkeleton
              size="default"
              label="Cấp đơn vị" name="capDonVi"
              type={CONSTANTS.SELECT}
              layoutCol={{ xs: 24 }}
              labelCol={{ xs: 7 }}
              options={{ data: Object.values(ORG_UNIT_TYPE) }}
              rules={[RULES.REQUIRED]}
              showSearch
              onChange={handleChangeOrgUnitType}
            />
            {parentKey && <CustomSkeleton
              size="default"
              label="Đơn vị cha" name="donViChaId"
              type={CONSTANTS.SELECT}
              allowClear
              layoutCol={{ xs: 24 }}
              labelCol={{ xs: 7 }}
              options={{
                data: props.orgUnitList.filter(orgUnit => orgUnit._id !== orgUnitSelected?._id)
                  .filter(orgUnit => orgUnit?.capDonVi === parentKey),
                valueString: '_id',
                labelString: 'tenDonVi',
              }}
              rules={[RULES.REQUIRED]}
              showSearch
            />}
          </Row>
        </Form>
      </Loading>
    </CustomModal>
  );
}

function mapStateToProps(store) {
  const { isLoading } = store.app;
  const { orgUnitList } = store.orgUnit;
  return { isLoading, orgUnitList };
}

export default connect(mapStateToProps, orgUnit.actions)(DonViDetail);
