import React from 'react';
import { Button, Form, Input, Row } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AuthBase from '@containers/Authenticator/AuthBase';

import { RULES } from '@constants';
import { URL } from '@url';

import * as app from '@app/store/ducks/app.duck';

function Login({ history, isLoading, ...props }) {

  function handleLogin(value) {
    props.login(value, history);
  }

  return <AuthBase>
    <Form size="large" layout="vertical" onFinish={handleLogin}>

      <Form.Item
        label="Tài khoản"
        name="taiKhoan"
        rules={[RULES.REQUIRED]}
      >
        <Input placeholder="Tài khoản" disabled={isLoading}/>
      </Form.Item>

      <Form.Item label="Mật khẩu" name="matKhau" rules={[RULES.REQUIRED]}>
        <Input.Password placeholder="******" disabled={isLoading}/>
      </Form.Item>

      <Row className="pt-2">
        <Button type="primary" htmlType="submit" loading={isLoading}>Đăng nhập</Button>
      </Row>
    </Form>
    <div className="mt-2">
      <Link to={URL.FORGET_PASSWORD}>
        Quên mật khẩu?
      </Link>
    </div>
  </AuthBase>;
}

function mapStateToProps(store) {
  const { isLoading } = store.app;
  return { isLoading };
}

export default connect(mapStateToProps, app.actions)(Login);
