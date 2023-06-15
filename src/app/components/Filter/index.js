import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Collapse, DatePicker, Form, Input, InputNumber, Row, Select } from 'antd';
import { CaretDownOutlined, CaretRightOutlined, CaretUpOutlined, ClearOutlined } from '@ant-design/icons';
import { delay } from 'lodash';

import { CONSTANTS } from '@constants';
import { cloneObj, convertQueryToObject, formatQueryOneDay, removeAccents } from '@app/common/functionCommons';

import '../Filter/Filter.scss';
import { withRouter } from 'react-router-dom';

const FILTER_PREFIX = 'filter-';

function Filter({ ...props }) {
  const { loading, dataSearch, clearWhenChanged, onSearchChange, layoutCol, labelCol, marginCollapsed } = props;
  const [formFilter] = Form.useForm();

  const [isCollapse, setCollapse] = useState(props.expandWhenStarting);
  const [isChanged, setChanged] = useState(false);

  useEffect(() => {
    if (props.history?.location?.search) {
      const queryObj = convertQueryToObject(props.history.location.search);
      delete queryObj.page;
      delete queryObj.limit;
      if (Object.values(queryObj).length) {
        Object.entries(queryObj).forEach(([key, value]) => {
          formFilter.setFieldsValue({ [`${FILTER_PREFIX}${key}`]: value });
        });
        delay(() => {
          setCollapse(true);
        }, 500);

      }
    }
  }, []);

  function renderFilterText(data) {
    return <Input
      placeholder={data.placeholder || data.label} disabled={loading} allowClear
      {...data.defaultValue ? { defaultValue: data.defaultValue } : null}
    />;
  }

  function renderFilterNumber(data) {
    return <InputNumber
      placeholder={data.placeholder || data.label} disabled={loading} allowClear style={{ width: '100%' }}
      {...data.defaultValue ? { defaultValue: data.defaultValue } : null}
    />;
  }

  function renderFilterSelect(data) {
    return <Select
      placeholder={data.placeholder || `Tất cả ${data.label?.toLowerCase()}`} disabled={loading}
      dropdownClassName="small"
      allowClear showSearch
      filterOption={(input, option) => removeAccents(option.children?.toLowerCase()).includes(removeAccents(input.toLowerCase()))}
      {...data.defaultValue ? { defaultValue: data.defaultValue } : null}
    >
      {Array.isArray(data.options) && data.options.map(option => {
        return <Select.Option key={option.value} value={option.value}>
          {option.label}
        </Select.Option>;
      })}

      {(typeof data.options === 'object' && Array.isArray(data.options.data))
        && data.options.data.map(option => {
          if (option) {
            return <Select.Option
              key={option.value || option.code || option[data.options?.valueString]}
              value={option.value || option.code || option[data.options?.valueString]}>
              {option.label || option[data.options?.labelString]}
            </Select.Option>;
          }
        })}
    </Select>;
  }

  function renderFilterMultiSelect(data) {
    return <Select
      placeholder={data.placeholder || `Chọn ${data.label}`} disabled={loading} dropdownClassName="small"
      allowClear mode="multiple"
      {...data.defaultValue ? { defaultValue: data.defaultValue } : null}
    >
      {Array.isArray(data.options) && data.options.map(option => {
        return <Select.Option key={option.value} value={option.value}>
          {option.label}
        </Select.Option>;
      })}
    </Select>;
  }

  function renderFilterDate(data) {
    return <DatePicker
      size="small" style={{ width: '100%' }} format="DD-MM-YYYY"
      placeholder={data.placeholder || `Chọn ${data.label}`} disabled={loading}
      dropdownClassName="small"
      {...data.defaultValue ? { defaultValue: data.defaultValue } : null}
    />;
  }

  function clearSearch() {
    formFilter.resetFields();
    if (!isChanged)
      setChanged(true);
  }

  function filter(values) {
    const query = {};
    dataSearch.forEach(item => {
      Object.entries(values).forEach(([key, value]) => {
        const filterKey = key.replace(FILTER_PREFIX, '');
        if (filterKey === item.name && value) {
          switch (item.type) {
            case CONSTANTS.TEXT:
              query[filterKey] = value;
              break;
            case CONSTANTS.ONE_DAY:
              query[filterKey] = formatQueryOneDay(value);
              break;
            case CONSTANTS.SELECT:
            case CONSTANTS.MULTI_SELECT:
            case CONSTANTS.NUMBER:
              query[filterKey] = [value];
              break;
            default:
              query[filterKey] = [value];
              break;
          }
        }
      });
    });
    setChanged(false);
    if (props.handleFilter) {
      props.handleFilter(query);
    }
  }

  function onValuesChange(changedValues, allValues) {
    if (!isChanged) {
      setChanged(true);
    }
    if (onSearchChange)
      onSearchChange(cloneObj(changedValues), cloneObj(allValues));
    if (clearWhenChanged) {
      Object.keys(changedValues).forEach(key => {
        clearWhenChanged.forEach(item => {
          if (key === item.change) {
            formFilter.setFieldsValue({ [item.clear]: undefined });
          }
        });
      });
    }
  }

  return (
    <Collapse
      ghost
      className={`filter-header ${(!isCollapse && marginCollapsed) ? 'mb-2' : ''}`}
      activeKey={isCollapse ? '1' : ''}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}
    >
      <Collapse.Panel
        showArrow={false}
        className="p-0"
        header={<Button type="primary" size="small" className="mb-2" onClick={() => setCollapse(!isCollapse)}>Bộ
          lọc {isCollapse ? <CaretUpOutlined/> : <CaretDownOutlined/>}</Button>}
        key="1">
        <Form form={formFilter} id="form-filter" autoComplete="off" size="small" colon={false} layout="horizontal"
              onValuesChange={onValuesChange}
              onFinish={filter}>
          <Row>
            {dataSearch.map((search, index) => {
              let xhtml;
              switch (search.type) {
                case CONSTANTS.TEXT:
                  xhtml = renderFilterText(search);
                  break;
                case CONSTANTS.SELECT:
                  xhtml = renderFilterSelect(search);
                  break;
                case CONSTANTS.MULTI_SELECT:
                  xhtml = renderFilterMultiSelect(search);
                  break;
                case CONSTANTS.DATE:
                case CONSTANTS.ONE_DAY:
                  xhtml = renderFilterDate(search);
                  break;
                case CONSTANTS.NUMBER:
                  xhtml = renderFilterNumber(search);
                  break;
                default:
                  xhtml = search.render;
                  break;
              }

              if (xhtml) {
                const labelColItem = search.labelCol || labelCol;
                const wrapperColItem = {};
                Object.entries(labelColItem).forEach(([key, value]) => {
                  wrapperColItem[key] = value === 24 ? 24 : 24 - value;
                });

                let countCol = {};
                Object.keys(layoutCol).forEach(key => countCol[key] = 0);

                for (let i = 0; i < dataSearch.length - 1; i++) {
                  if (i < index) {
                    const layoutColCurrent = dataSearch[i].layoutCol || layoutCol;
                    const layoutColNext = dataSearch[i + 1].layoutCol || layoutCol;

                    Object.keys(countCol).forEach(key => {
                      countCol[key] = (countCol[key] + layoutColCurrent[key] + layoutColNext[key]) > 24 ? 0 : (countCol[key] + layoutColCurrent[key]);
                      countCol[key] = countCol[key] % 24;
                    });
                  }
                }

                let className = '';
                Object.entries(countCol).forEach(([key, value]) => {
                  className += className ? ' ' : '';
                  className += `pl-${key}-${value % 24 ? 3 : 0}`;
                });

                return <Col {...(search.layoutCol || layoutCol)} key={search.name} className={className}>
                  <Form.Item
                    labelCol={labelColItem}
                    wrapperCol={wrapperColItem}
                    label={search.label}
                    name={FILTER_PREFIX + search.name}
                    labelAlign="left">
                    {xhtml}
                  </Form.Item>
                </Col>;
              }
            })}
          </Row>
          <Col {...layoutCol} className="ml-auto">
            <div className="ant-form-item d-block clearfix">
              <Button htmlType="submit" size="small" type="primary" className="pull-right"
                      disabled={loading || !isChanged}
                      icon={<i className="fa fa-filter mr-1 mb-2"/>}>
                Tìm kiếm
              </Button>
              <Button htmlType="button" size="small" className="pull-right mr-2 mb-2" disabled={loading}
                      danger
                      icon={<ClearOutlined/>} onClick={clearSearch}>
                Xoá bộ lọc
              </Button>
            </div>
          </Col>

        </Form>
      </Collapse.Panel>
    </Collapse>
  );

}

Filter.propTypes = {
  layoutCol: PropTypes.object,
  labelCol: PropTypes.object,
  marginCollapsed: PropTypes.bool,
  expandWhenStarting: PropTypes.bool,
};

Filter.defaultProps = {
  layoutCol: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12, xxl: 8 },
  labelCol: { xs: 24, sm: 6, md: 10, lg: 10, xl: 10, xxl: 8 },
  marginCollapsed: false,
  expandWhenStarting: false,
};

export default withRouter(Filter);
