import React from 'react';
import { Button } from 'antd';
import { URL } from '@url';

import ERROR_404 from '@assets/images/icon/error-404.svg';
import './NoMatch.scss';

export default function NoMatch({ history }) {
  return <div id="no-match-container">
    <div id="no-match">
      <img className="img-not-found" src={ERROR_404} alt=""/>
      <div className="no-match__text">Xin lỗi trang bạn truy cập không tồn tại!</div>
      <Button type="primary" className="btn no-match__btn" onClick={() => history.replace(URL.MENU.DASHBOARD)}>
        <span className="btn__title">
          Quay về trang chủ
        </span>
      </Button>
    </div>
  </div>;
}
