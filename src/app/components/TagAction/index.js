import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Popconfirm, Tag, Tooltip } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function TagAction({ color, className, disabled, style, onClick, label, icon, loading, ...props }) {
  const { isConfirm, confirmTitle, confirmCancelText, confirmOkText, okButtonType, placement } = props;
  const { tooltip, tooltipColor, tooltipPlacement } = props;
  const { isSubmit, formId } = props;
  const { linkTo } = props;

  function renderTag(onClickFunc = null) {

    function tag() {
      return <Tag
        className={`tag-action ${className}`}
        color={disabled ? 'default' : color}
        style={style}
        disabled={disabled}
        onClick={(disabled || linkTo) ? () => null : onClickFunc}
      >
        {!!icon && <div className={`tag-action__icon ${label ? 'mr-1' : ''}`}>
          {loading ? <LoadingOutlined/> : icon}
        </div>}
        {label ? <span>{label}</span> : null}
      </Tag>;
    }

    return linkTo
      ? <Link to={linkTo} {...props.viewNewTab ? { target: '_blank' } : {}}>
        {tag()}
      </Link>
      : tag();
  }

  function renderSubmit() {
    const btnSubmit = React.useRef(null);

    return <>
      <button type="submit" ref={btnSubmit} form={formId} className="d-none"/>
      {renderTag(() => btnSubmit.current?.click())}
    </>;
  }

  if (isConfirm && !isSubmit) {
    return <Popconfirm
      title={confirmTitle}
      onConfirm={onClick}
      cancelText={confirmCancelText}
      okText={confirmOkText}
      placement={placement}
      okButtonProps={{ htmlType: 'submit', form: formId, type: okButtonType }}>
      {renderTag()}
    </Popconfirm>;
  }

  // if (isConfirm && !isSubmit) {
  //
  // }

  if (isSubmit && formId) {
    return renderSubmit();
  } else if (tooltip && !disabled) {
    return <Tooltip placement={tooltipPlacement} title={tooltip} color={tooltipColor || color}>
      {renderTag(onClick)}
    </Tooltip>;
  }
  return renderTag(onClick);
}

TagAction.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  tooltip: PropTypes.string,
  tooltipColor: PropTypes.string,
  tooltipPlacement: PropTypes.string,
  onClick: PropTypes.func,

  placement: PropTypes.string,
  okButtonType: PropTypes.string,

  confirmOkText: PropTypes.string,
  confirmCancelText: PropTypes.string,
  linkTo: PropTypes.string,
  viewNewTab: PropTypes.bool,
};

TagAction.defaultProps = {
  className: '',
  style: {},
  tooltip: null,
  tooltipColor: '',
  tooltipPlacement: 'top',
  onClick: () => null,

  placement: 'top',
  okButtonType: 'danger',

  confirmOkText: 'Xóa',
  confirmCancelText: 'Hủy',
  linkTo: null,
  viewNewTab: false,
};


export default TagAction;
