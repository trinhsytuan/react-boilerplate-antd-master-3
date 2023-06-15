import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Table, Tabs, Tag } from 'antd';
import { connect } from 'react-redux';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import CustomSkeleton from '@components/CustomSkeleton';
import CustomDivider from '@components/CustomDivider';
import ActionCell from '@components/ActionCell';
import CustomModal from '@components/CustomModal';

import { CONSTANTS, EXTRA_FIELD, KIEU_DU_LIEU, RULES } from '@constants';
import { createTruongDuLieu, updateTruongDuLieu, deleteTruongDuLieu } from '@app/services/DuLieuBoSung';
import { cloneObj, toast } from '@app/common/functionCommons';

import * as extraField from '@app/store/ducks/extraField.duck';

function DuLieuBoSung({ permission, isLoading, extraData, ...props }) {
  const [formEditExtra] = Form.useForm();

  const [isShowModalKetQua, toggleModalKetQua] = useState(false);
  const [extraEditing, setExtraEditing] = useState({});

  const allowChange = (permission.create && !extraEditing._id) || (permission.update && extraEditing._id);

  useEffect(() => {
    (async () => {
    })();
  }, []);

  function handleShowPopup(extraSelected = {}) {
    extraSelected = cloneObj(extraSelected);
    formEditExtra.resetFields();
    setExtraEditing(extraSelected);
    if (extraSelected?._id) {
      formEditExtra.setFieldsValue(extraSelected);
    }
    toggleModalKetQua(true);
  }


  function handleClosePopup() {
    if (extraEditing) {
      setExtraEditing({});
    }
    toggleModalKetQua(false);
  }

  async function handleDelete(deleteData) {
    const apiRequest = cloneObj(deleteData);
    apiRequest.is_deleted = true;
    const apiResponse = await deleteTruongDuLieu(deleteData._id);
    if (apiResponse) {
      const extraDataNew = cloneObj(extraData);
      extraDataNew[apiResponse.model] = extraDataNew[apiResponse.model].filter(extra => extra._id !== apiResponse._id);
      await props.setExtraData(extraDataNew);
      toast(CONSTANTS.SUCCESS, `Xóa Dữ liệu bổ sung thành công`);
    }
  }

  function onValuesChange(changedValues) {
    const { fieldType } = changedValues;
    if (fieldType) {
      setExtraEditing({ ...extraEditing, fieldType });
      formEditExtra.resetFields(['fieldOptions']);
    }
  }

  async function onFinish(values) {
    const apiRequest = cloneObj(values);
    let apiResponse = null;
    if (extraEditing._id) {
      apiRequest._id = extraEditing._id;
      apiResponse = await updateTruongDuLieu(apiRequest);
    } else {
      apiRequest.model = extraEditing.model;
      apiResponse = await createTruongDuLieu(apiRequest);
    }

    if (apiResponse) {
      let messageString;
      if (extraEditing._id) {
        messageString = 'Chỉnh sửa Dữ liệu bổ sung thành công';
        const extraDataNew = cloneObj(extraData);
        extraDataNew[apiResponse.model] = extraDataNew[apiResponse.model].map(extra => {
          return extra._id === apiResponse._id ? apiResponse : extra;
        });
        await props.setExtraData(extraDataNew);
      } else {
        messageString = 'Thêm mới Dữ liệu bổ sung thành công';
        await props.getExtraData();
      }
      toggleModalKetQua(false);
      toast(CONSTANTS.SUCCESS, messageString);
    }
  }

  return (
    <>
      <Tabs size="small">
        {Object.values(EXTRA_FIELD).map((extraConstant, index) => {
          return <Tabs.TabPane tab={extraConstant.label} key={(index + 1).toString()}>
            {Array.isArray(extraData?.[extraConstant.code]) &&
            <Table
              size="small"
              bordered
              dataSource={extraData?.[extraConstant.code]}
              pagination={false}
              scroll={{ x: 'max-content' }}
            >
              <Table.Column title="STT" render={(value, row, index) => index + 1}/>
              <Table.Column title="Mã trường" dataIndex="fieldKey"/>
              <Table.Column title="Tên trường" dataIndex="fieldName"/>
              <Table.Column title="Kiểu dữ liệu" dataIndex="fieldType" render={value => KIEU_DU_LIEU[value].label}/>
              <Table.Column title="Thứ tự" dataIndex="thuTu"/>

              <Table.Column
                render={(value) => <ActionCell
                  value={value}
                  editText=""
                  deleteText=""
                  handleEdit={handleShowPopup}
                  handleDelete={handleDelete}
                  permission={permission}
                />}
                width={80} fixed="right" align="right"
              />
            </Table>}

            {permission.create && <div className="w-100 d-flex mt-3">
              <Tag className="tab-btn tab-btn-sm m-auto" color="#FF9C09"
                   onClick={() => handleShowPopup({ model: extraConstant.code })}
              >
                Thêm dữ liệu
                <i className="fa fa-plus ml-2"/>
              </Tag>
            </div>}


          </Tabs.TabPane>;
        })}
      </Tabs>

      {isShowModalKetQua &&
      <CustomModal
        width={720} maskClosable={false}
        title={extraEditing._id
          ? permission.update ? 'Cập nhật dữ liệu bổ sung' : 'Chi tiết dữ liệu bổ sung'
          : 'Thêm mới dữ liệu bổ sung'}
        visible={isShowModalKetQua}
        onCancel={handleClosePopup}
        formId="form-edit-extra"
        isLoadingSubmit={props.isLoading}
        isDisabledClose={props.isLoading}
        closeLabel="Hủy bỏ"
        submitLabel="Lưu kết quả"
        showFooter={!!allowChange}
      >
        <Form id="form-edit-extra" form={formEditExtra} onFinish={(values) => onFinish(values)}
              onValuesChange={onValuesChange}>
          <Row gutter={10}>
            <CustomSkeleton
              size="default"
              label="Mã trường" name="fieldKey"
              layoutCol={{ xs: 24, sm: 12 }} labelCol={{ sm: 12, md: 8, lg: 8 }}
              type={CONSTANTS.TEXT}
              rules={[RULES.REQUIRED]}
              showInputLabel={!allowChange}
              form={formEditExtra}
            />
            <CustomSkeleton
              size="default"
              label="Tên trường" name="fieldName"
              layoutCol={{ xs: 24, sm: 11 }} labelCol={{ sm: 12, md: 8, lg: 8 }}
              type={CONSTANTS.TEXT}
              rules={[RULES.REQUIRED]}
              showInputLabel={!allowChange}
              form={formEditExtra}
            />
            <CustomSkeleton
              size="default"
              label="Kiểu dữ liệu" name="fieldType"
              layoutCol={{ xs: 24, sm: 12 }} labelCol={{ sm: 12, md: 8, lg: 8 }}
              type={CONSTANTS.SELECT}
              rules={[RULES.REQUIRED]}
              options={{ data: Object.values(KIEU_DU_LIEU), valueString: 'code', labelString: 'label' }}
              showInputLabel={!allowChange}
            />
            <CustomSkeleton
              size="default"
              label="Thứ tự" name="thuTu"
              layoutCol={{ xs: 24, sm: 11 }} labelCol={{ sm: 12, md: 8, lg: 8 }}
              type={CONSTANTS.NUMBER}
              rules={[RULES.REQUIRED]}
              min={1}
              showInputLabel={!allowChange}
            />
          </Row>

          {extraEditing.fieldType === KIEU_DU_LIEU.DANH_SACH.code
          && <>
            <CustomDivider className="m-0 divider-before-5-percent" title="Dữ liệu danh sách" titleBold={false}/>
            <Form.List name="fieldOptions">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map(field => {
                    return <div key={field.key}>
                      <Row gutter={15}>
                        <CustomSkeleton
                          size="default"
                          label="Mã dữ liệu"
                          name={[field.name, 'value']}
                          fieldKey={[field.fieldKey, 'value']}
                          layoutCol={{ xs: 24, sm: 12 }} labelCol={{ sm: 12, md: 8, lg: 8 }}
                          type={CONSTANTS.TEXT}
                          rules={[RULES.REQUIRED]}
                          showInputLabel={!allowChange}
                          form={formEditExtra}
                          formListName="fieldOptions"
                        />
                        <CustomSkeleton
                          size="default"
                          label="Tên dữ liệu"
                          name={[field.name, 'label']}
                          fieldKey={[field.fieldKey, 'label']}
                          layoutCol={{ xs: 24, sm: 11 }} labelCol={{ sm: 12, md: 8, lg: 8 }}
                          type={CONSTANTS.TEXT}
                          rules={[RULES.REQUIRED]}
                          showInputLabel={!allowChange}
                          form={formEditExtra}
                          formListName="fieldOptions"
                        />
                        {(fields.length > 1 && allowChange) && <Col xs={24} sm={1} className="p-0">
                          <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)}/>
                        </Col>}

                      </Row>

                    </div>;
                  })}
                  {allowChange && <div className="clearfix mt-1">
                    <Button
                      type="primary" size="small"
                      className="pull-right"
                      onClick={() => add()}
                      disabled={isLoading}>
                      Thêm trường
                      <PlusOutlined className="ml-2"/>
                    </Button>
                  </div>}
                </>
              )}
            </Form.List>
          </>}
        </Form>
      </CustomModal>}
    </>
  );
}

function mapStateToProps(store) {
  const permission = store.user.permissions?.extraData;
  const { settingData } = store.setting;
  const { extraData } = store;
  const { isLoading } = store.app;
  return { permission, isLoading, settingData, extraData };
}

export default (connect(mapStateToProps, { ...extraField.actions })(DuLieuBoSung));
