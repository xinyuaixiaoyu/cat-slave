import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { CategoryTableColumns } from '../../config';
import Modal from './CategoryModal';
import { post } from '../../../../utils/request';
import './index.less';

const Category = () => {
  const [visible, setVisible] = useState(false);
  const [dataSource, changeData] = useState([]);
  const [pagination, setPageData] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const changeStatus = () => {
    setVisible(!visible);
  };
  const queryCategory = async (pageData) => {
    const res = await post('/api/queryCategory', pageData);
    const { success = false, categoryList = [], pageSize = 5, total = 0 } =
      res || {};
    if (success) {
      changeData(categoryList);
      setPageData({
        ...pagination,
        pageSize: pageSize,
        total: total,
      });
      return res;
    }
    return {};
  };
  const handleSubmit = async (params) => {
    const res = await post('/api/addCategory', params);
    if (res.success) {
      changeStatus();
      queryCategory(pagination);
    }
  };
  const delCategory = async (id) => {
    const res = await post('/api/delCategory', { categoryId: id });
    if (res.success) {
      const { categoryList = [] } = await queryCategory(pagination);
      if (categoryList.length === 0) {
        setPageData({
          ...pagination,
          current: 1,
        });
      }
    }
  };
  const handleTableChange = (page) => {
    setPageData({
      ...pagination,
      current: page,
    });
  };
  useEffect(() => {
    queryCategory(pagination);
  }, [pagination.current]);

  return (
    <div>
      <div styleName="operation">
        <Button type="primary" onClick={changeStatus}>
          新增
        </Button>
      </div>
      <Modal
        visible={visible}
        onCancel={changeStatus}
        handleSubmit={handleSubmit}
      ></Modal>
      <Table
        columns={CategoryTableColumns(delCategory)}
        dataSource={dataSource}
        pagination={{
          ...pagination,
          onChange: (current) => handleTableChange(current),
        }}
      ></Table>
    </div>
  );
};

export default Category;
