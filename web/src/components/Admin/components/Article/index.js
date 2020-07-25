import React from 'react';
import Modal from '../ArticleModal/index';
import { Table, Button } from 'antd';
import { TableColumns } from '../../config';
import './index.less';

const Article = () => {
  const dataSource = [
    {
      key: '1',
      title: '111',
      type: '222',
      date: '111',
    },
  ];
  return (
    <div>
      <div styleName="operation">
        <Button type="primary">新增</Button>
      </div>
      <Modal visible={true}></Modal>
      <Table columns={TableColumns} dataSource={dataSource}></Table>
    </div>
  );
};

export default Article;
