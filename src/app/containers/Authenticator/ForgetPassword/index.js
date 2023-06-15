import React from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { Button, Form, Input, Row } from 'antd';

import AuthBase from '@containers/Authenticator/AuthBase';

import { requestForgetPassword } from '@app/services/User';
import { URL } from '@url';
import { CONSTANTS, RULES } from '@constants';
import { toast } from '@app/common/functionCommons';

function ForgetPassword() {
  let history = useHistory();

  async function forgetPassword(values) {
    const response = await requestForgetPassword(values);
    if (response.success) {
      toast(CONSTANTS.SUCCESS, 'Hệ thống đã gửi email xác nhận mật khẩu. Truy cập Email để kích hoạt lại mật khẩu');
      history.push('/');
    } else {
      toast(CONSTANTS.WARNING, 'Có lỗi trong quá trình gừi email. Vui lòng thử lại.');
    }
  }

  return (<AuthBase>
      <Form id="formModal" size="large" layout="vertical" onFinish={forgetPassword} autoComplete="new-password">
        <Form.Item label="Email" name="email" rules={[RULES.REQUIRED, RULES.EMAIL]}>
          <Input placeholder="Email"/>
        </Form.Item>

        <Row className="pt-2">
          <Button type="primary" htmlType="submit">Xác nhận</Button>
        </Row>
      </Form>
      <div className="mt-2">
        <Link to={URL.LOGIN}>
          Quay lại
        </Link>
      </div>
    </AuthBase>
  );
}

export default withRouter(ForgetPassword);
