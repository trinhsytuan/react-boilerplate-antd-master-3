import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';

import './CustomModal.scss';
import CloseIcon from '@components/CustomModal/CloseIcon';
import Loading from '@components/Loading';

export default function CustomModal(
  {
    width,
    className, headerStyle, bodyLoading,
    title, children, footer, footerAlign, disabled,
    formId,
    isLoadingSubmit, isDisabledSubmit, submitIcon, submitLabel,
    isLoadingContinue, isDisabledContinue, continueIcon, continueLabel,
    isLoadingClose, isDisabledClose, closeIcon, closeLabel,
    showFooter,
    onCancel,
    onAddAndContinue,
    showAddAndContinue,
    allowClose,
    allowOk,
    onOk,
    ...props
  }) {

  const handleClose = (isLoadingSubmit || isDisabledClose) ? null : onCancel;
  const handleAddAndContinue = (isLoadingSubmit || isDisabledClose) ? null : onAddAndContinue;
  return (
    <Modal
      {...props}
      width={width}
      closeIcon={<CloseIcon/>}
      className={`custom-modal ${className}`}
      onCancel={handleClose}
      footer={null}>

      <div className="custom-modal-header" style={headerStyle}>
        {title}
      </div>

      <Loading active={bodyLoading} className="custom-modal-body">
        {children}
      </Loading>
      {showFooter && <div className="custom-modal-footer" style={{ textAlign: footerAlign }}>
        <Button
          size="default"
          className="btn btn-cancel"
          onClick={handleClose} disabled={isDisabledClose}
          loading={isLoadingClose} icon={closeIcon}>
          {closeLabel}
        </Button>
        {showAddAndContinue && <Button
          size="default" type="primary"
          className="btn"
          onClick={handleAddAndContinue}
          disabled={isDisabledContinue}
          loading={isLoadingContinue && !isDisabledContinue} icon={continueIcon}>
          {continueLabel}
        </Button>}
        {allowOk && <Button
          size="default"
          type="primary" htmlType="submit"
          className="btn"
          form={formId}
          disabled={isDisabledSubmit}
          {...onOk ? { onClick: onOk } : null}
          loading={isLoadingSubmit && !isDisabledSubmit} icon={submitIcon}>
          {submitLabel}
        </Button>}
      </div>}
    </Modal>
  );
}


CustomModal.propTypes = {
  bodyLoading: PropTypes.bool,
  width: PropTypes.any,
  showFooter: PropTypes.bool,
  allowOk: PropTypes.bool,
  showAddAndContinue: PropTypes.bool,
  formId: PropTypes.string,
  footerAlign: PropTypes.string,
  closeLabel: PropTypes.string,
  submitLabel: PropTypes.string,
  continueLabel: PropTypes.string,
  headerStyle: PropTypes.object,
};

CustomModal.defaultProps = {
  bodyLoading: false,
  width: 520,
  showFooter: true,
  allowOk: true,
  showAddAndContinue: false,
  formId: 'form-modal',
  footerAlign: 'right',
  closeLabel: 'Hủy',
  submitLabel: 'Lưu',
  continueLabel: 'Thêm và tiếp tục',
  headerStyle: {},
};
