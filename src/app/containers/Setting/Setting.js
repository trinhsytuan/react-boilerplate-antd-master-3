import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Tabs } from 'antd';
import { connect } from 'react-redux';
import { SaveFilled } from '@ant-design/icons';

import CustomSkeleton from '@components/CustomSkeleton';

import { CONSTANTS } from '@constants';
import { updateSetting } from '@app/services/Setting';
import { cloneObj, toast } from '@app/common/functionCommons';

function Setting({ permission, isLoading, caiDatHeThong }) {
  const [formSetting] = Form.useForm();
  const [isFirst, setFirst] = useState(true);
  const [activeKey, setActiveKey] = useState('1');

  const allowChange = permission.update;

  useEffect(() => {
    (async () => {
      await setFirst(true);
      await setDataForm();

    })();
  }, []);

  async function setDataForm() {
    const dataField = cloneObj(caiDatHeThong);
    formSetting.setFieldsValue(dataField);
    setFirst(false);
  }


  async function handleSaveData(values) {
    let apiResponse = null;
    apiResponse = await updateSetting(values);
    if (apiResponse) {
      toast(CONSTANTS.SUCCESS, 'Chỉnh sửa cài đặt thành công');
    }
  }

  return (
    <>
      <Tabs size="small" onChange={setActiveKey} activeKey={activeKey}>
        <Tabs.TabPane tab="Cài đặt hệ thống" key="1">
          <Form form={formSetting} autoComplete="off" onFinish={handleSaveData}>
            <Row gutter={15}>

              <CustomSkeleton
                size="default"
                label="Thời gian hết phiên đăng nhập" name="phienDangNhap"
                type={CONSTANTS.NUMBER}
                labelCol={{ xs: 15 }} layoutCol={{ xs: 12 }}
                min={1}
                helpInline={false}
                disabled={isLoading}
                isShowSkeleton={isFirst}
                showInputLabel={!allowChange}
              />

              <CustomSkeleton
                size="default"
                name="donViDangNhap"
                type={CONSTANTS.SELECT}
                labelCol={{ xs: { span: 0 }, md: { span: 0 } }}
                layoutCol={{ xs: 4, md: 4 }}
                options={{
                  data: [
                    { label: 'Giờ', value: 'h' },
                    { label: 'Ngày', value: 'd' },
                  ],
                }}
                disabled={isLoading}
                isShowSkeleton={isFirst}
                showInputLabel={!allowChange}
              />

              <CustomSkeleton
                size="default"
                label="Thời gian hết phiên reset mật khẩu" name="phienReset"
                type={CONSTANTS.NUMBER}
                labelCol={{ xs: 15 }}
                layoutCol={{ xs: 12 }}
                min={1}
                disabled={isLoading}
                helpInline={false}
                isShowSkeleton={isFirst}
                showInputLabel={!allowChange}
              />
              <CustomSkeleton
                size="default"
                name="donViReset"
                type={CONSTANTS.SELECT}
                labelCol={{ xs: { span: 0 }, md: { span: 0 } }}
                layoutCol={{ xs: 12, md: 4 }}
                options={{
                  data: [
                    { label: 'Giờ', value: 'h' },
                    { label: 'Phút', value: 'm' },
                  ],
                }}
                disabled={isLoading}
                isShowSkeleton={isFirst}
                showInputLabel={!allowChange}
              />

              {allowChange && <Col xs={24}>
                <Button
                  htmlType="submit" size="small"
                  type="primary" className="float-right"
                  icon={<SaveFilled/>}
                  disabled={isLoading || isFirst}>
                  Lưu
                </Button>
              </Col>}
            </Row>
          </Form>
        </Tabs.TabPane>
      </Tabs>
    </>

  );
}

function mapStateToProps(store) {
  const permission = store.user.permissions?.caiDat;
  const { caiDatHeThong } = store.caiDat;
  const { isLoading } = store.app;
  return { permission, isLoading, caiDatHeThong };
}

export default (connect(mapStateToProps)(Setting));
