import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import QuanLyDuongDayIcon from '@components/Icons/QuanLyDuongDayIcon';
import TonTaiViTriIcon from '@components/Icons/TonTaiViTriIcon';
import TonTaiThietBiIcon from '@components/Icons/TonTaiThietBiIcon';
import { CONSTANTS_MODULE } from '@constants';

import * as module from '@app/store/ducks/module.duck';


function SelectModule({ permissions, isLoading, ...props }) {
  const congTrinhPermission = permissions?.construction;
  const tonTaiThietBiPermission = permissions?.tonTaiThietBi;

  useEffect(() => {
    const moduleApp = localStorage.getItem('moduleApp');
    if (moduleApp) {
      props.setModuleApp(moduleApp);
    }
  }, []);

  function handleSelect(moduleSelected) {
    props.setModuleApp(moduleSelected);
  }

  return <div id="select-module">
    <div className="list-module">
      <div className="module-container" onClick={() => handleSelect(CONSTANTS_MODULE.QUAN_LY_DUONG_DAY.code)}>
        <div className="module-item">
          <div className="module-item__icon">
            <QuanLyDuongDayIcon/>
          </div>
          <div className="module-item__label">
            <label>
              QUẢN LÝ ĐƯỜNG DÂY
            </label>
          </div>
          <div className="module-item__underlined"/>
        </div>
      </div>

      <div className={`module-container ${congTrinhPermission?.read ? '' : 'disabled'}`}
           onClick={congTrinhPermission?.read ? () => handleSelect(CONSTANTS_MODULE.TON_TAI_CONG_TRINH.code) : null}>
        <div className="module-item">
          <div className="module-item__icon">
            <TonTaiViTriIcon/>
          </div>
          <div className="module-item__label">
            <label>
              <div>TỒN TẠI CÔNG TRÌNH</div>
              <div>XÂY DỰNG</div>
            </label>
          </div>
          <div className="module-item__underlined"/>
        </div>
      </div>

      <div className={`module-container ${tonTaiThietBiPermission?.read ? '' : 'disabled'}`}
           onClick={tonTaiThietBiPermission?.read ? () => handleSelect(CONSTANTS_MODULE.TON_TAI_THIET_BI.code) : null}>
        <div className="module-item">
          <div className="module-item__icon">
            <TonTaiThietBiIcon/>
          </div>
          <div className="module-item__label">
            <label>
              TỒN TẠI THIẾT BỊ
            </label>
          </div>
          <div className="module-item__underlined"/>
        </div>
      </div>
    </div>

  </div>;
}


function mapStateToProps(store) {
  const { permissions } = store.user;
  return { permissions };
}

export default (connect(mapStateToProps, { ...module.actions })(withRouter(SelectModule)));
