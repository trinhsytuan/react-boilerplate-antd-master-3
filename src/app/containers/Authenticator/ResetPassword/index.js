import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Row } from 'antd';
import { Link, useHistory, withRouter } from 'react-router-dom';
import queryString from 'query-string';

import AuthBase from '@containers/Authenticator/AuthBase';

import { requestResetPassword } from '@app/services/User';
import { CONSTANTS, RULES } from '@constants';
import { URL } from '@url';
import { toast } from '@app/common/functionCommons';

import * as app from '@app/store/ducks/app.duck';

function ResetPassword(props) {
  let history = useHistory();
  const { search } = useHistory()?.location;
  const { token } = queryString.parseUrl(search)?.query;

  const resetPassword = async values => {
    const response = await requestResetPassword(token, { password: values.password });
    if (response && response.success) {
      toast(CONSTANTS.SUCCESS, 'Thay đổi mật khẩu thành công');
      props.clearToken();
      history.push('/');
    }
  };

  return (<AuthBase>
    <Form id="formModal" size="large" layout="vertical" onFinish={resetPassword} autoComplete="new-password">
      <Form.Item label="Mật khẩu mới" name="password" rules={[RULES.REQUIRED]}>
        <Input.Password placeholder="Mật khẩu mới"/>
      </Form.Item>
      <Form.Item label="Nhập lại mật khẩu mới" name="confirmPassword" rules={[
        RULES.REQUIRED,
        ({ getFieldValue }) => ({
          validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject('Mật khẩu không trùng khớp');
          },
        }),
      ]}>
        <Input.Password placeholder="Nhập lại mật khẩu mới"/>
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
  </AuthBase>);
}

export default (connect(null, app.actions))(withRouter(ResetPassword));
