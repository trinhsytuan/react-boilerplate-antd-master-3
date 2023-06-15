import React from 'react';
import { Popconfirm, Tag, Tooltip } from 'antd';
import PropTypes from 'prop-types';

export default function TagButton({ size, icon, imgSrc, title, className, color, disabled, onClick, style, ...props }) {
  const { isSubmit } = props;
  const { placement, tooltipTitle, tooltipClass } = props;
  const { isConfirm, confirmTitle, confirmCancelText, confirmOkText, formId, okButtonType } = props;

  const btnSubmit = React.useRef(null);

  let tag = <Tag
    className={`tab-btn${size === 'small' ? ' tab-btn-sm' : ''} ${className}`}
    {...style ? { style } : {}}
    {...color ? { color } : {}}
    {...icon ? { icon } : {}}
    {...disabled ? { disabled } : {}}
    {...(onClick && !disabled && !isConfirm) ? { onClick: isSubmit ? () => btnSubmit.current?.click() : onClick } : {}}
  >
    {title}
  </Tag>;

  if (tooltipTitle) {
    tag = <Tooltip placement={placement} title={tooltipTitle} className={tooltipClass} zIndex={1020}>
      {tag}
    </Tooltip>;
  }


  if (isConfirm) {
    if (!isSubmit) {
      tag = <Popconfirm
        title={confirmTitle}
        onConfirm={onClick}
        cancelText={confirmCancelText}
        okText={confirmOkText}
        placement={placement}
        okButtonProps={{ htmlType: 'submit', form: formId, type: okButtonType }}>
        {tag}
      </Popconfirm>;
    } else {
      tag = <>
        <button type="submit" ref={btnSubmit} form={formId} className="d-none"/>
        {tag}
      </>;
    }
  }

  return tag;
}

TagButton.propTypes = {
  title: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  color: PropTypes.string,
  icon: PropTypes.any,

  placement: PropTypes.string,
  tooltipTitle: PropTypes.string,
  tooltipClass: PropTypes.string,

  confirmTitle: PropTypes.string,
  okButtonType: PropTypes.string,
  confirmOkText: PropTypes.string,
  confirmCancelText: PropTypes.string,
};

TagButton.defaultProps = {
  title: '',
  className: '',
  style: {},
  size: 'default',
  disabled: false,
  onClick: () => null,
  color: '#00199F',
  icon: null,

  placement: 'top',
  tooltipTitle: '',
  tooltipClass: '',

  confirmTitle: 'Lưu dữ liệu',
  okButtonType: 'primary',
  confirmOkText: 'Lưu',
  confirmCancelText: 'Hủy',
};

