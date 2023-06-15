import React from 'react';
import { TreeSelect } from 'antd';
import PropTypes from 'prop-types';

import CustomSkeleton from '@components/CustomSkeleton';
import { removeAccents, renderTreeNode } from '@app/common/functionCommons';

function TreeUnit({ treeData, treeDefaultExpandAll, showSearch, allowClear, value, onChange, ...props }) {

  return <>
    <CustomSkeleton {...props} helpInline={false}>
      <TreeSelect
        size={props.size}
        {...(showSearch ? { showSearch } : {})}
        {...(allowClear ? { allowClear } : {})}
        {...(value ? { value } : {})}
        {...(onChange ? { onChange } : {})}
        style={{ width: '100%' }}
        className={props.showInputLabel ? 'select-label' : ''}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder={props.showInputLabel ? '' : (props.placeholder || (props.label ? `Chọn ${props.label}` : ''))}
        treeDefaultExpandAll
        disabled={props.disabled || props.showInputLabel}
        filterOption={(input, option) => removeAccents(option.title?.toLowerCase()).includes(removeAccents(input.toLowerCase()))}
      >
        {renderTreeNode(treeData)}
      </TreeSelect>
    </CustomSkeleton>
  </>;
}

TreeUnit.propTypes = {
  treeData: PropTypes.array,
  treeDefaultExpandAll: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  showSearch: PropTypes.bool,
};

TreeUnit.defaultProps = {
  treeData: [],
  treeDefaultExpandAll: true,
  disabled: false,
  size: 'small',
  showSearch: true,
};

export default TreeUnit;
