import React from 'react';
import PropTypes from 'prop-types';

import './Divinder.scss';

export default function CustomDivider({ className, orientation, titleBold, ...props }) {

  const dividerClass = 'custom-divider ant-divider ant-divider-horizontal ant-divider-with-text';

  return (
    <div className="w-100">
      <div className={`${dividerClass} ant-divider-with-text-${orientation}${className ? ' ' + className : ''}`}>
        {props.title && <span className={`ant-divider-inner-text ${titleBold ? 'font-weight-bold' : ''}`}>
        {props.title}
      </span>}
        <div className="ant-divider-inner__divider"/>
        <span className="ant-divider-inner-extra">
        {props.extra}
      </span>
      </div>
    </div>
  );
}

CustomDivider.propTypes = {
  className: PropTypes.string,
  orientation: PropTypes.string,
  titleBold: PropTypes.bool,
};

CustomDivider.defaultProps = {
  className: '',
  orientation: 'left',
  titleBold: true,
};
