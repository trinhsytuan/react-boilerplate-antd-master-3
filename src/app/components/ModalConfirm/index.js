import React from 'react';
import { Form, Modal } from 'antd';

import ModalFooter from '@components/ModalFooter/ModalFooter';

import './ModalConfirm.scss';

function ModalConfirm({ title, visible, onCancel, onFinish, isLoadingSubmit, isDisabledClose, ...props }) {


  return <>
    <Modal
      width="420px"
      closeIcon={<i className="fa fa-times"/>}
      title="Xác nhận"
      visible={visible}
      onCancel={onCancel}
      footer={<ModalFooter
        handleClose={onCancel}
        isLoadingSubmit={isLoadingSubmit}
        isDisabledClose={isDisabledClose}
        formId="modal-form"
      />}
    >
      <Form id="modal-form" onFinish={onFinish}>
        <h3>{title}</h3>
      </Form>
    </Modal>
  </>;
}

export default ModalConfirm;

ModalConfirm.propTypes = {};

ModalConfirm.defaultProps = {};
