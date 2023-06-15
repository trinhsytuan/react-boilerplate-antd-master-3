import React from 'react';
import { Button } from 'antd';

export default function CustomButton({ isCancel = false, icon, imgSrc, title, className, ...props }) {
  return (
    <Button
      {...props}
      className={`btn ${isCancel ? 'btn-cancel' : ''} ${className}`}
      htmlType="submit"
      type="primary"
    >
      <div className="btn__icon">
        {icon
          ? icon
          : imgSrc
            ? <img src={imgSrc} alt=""/>
            : null}
      </div>
      <span className="btn__title">{title}</span>
    </Button>
  );
}

