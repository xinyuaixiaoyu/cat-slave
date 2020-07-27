import React, { useState } from 'react';
import Modal from './ArticleModal/index';
import { Table, Button } from 'antd';
import { ArticleTableColumns } from '../../config';
import './index.less';

const dataSource = [
  {
    key: '1',
    title: '111',
    type: '222',
    date: '111',
  },
];
const Article = () => {
  const [visible, setVisible] = useState(false);
  const changeStatus = () => {
    setVisible(!visible);
  };
  const handleEdit = () => {
    setVisible(!visible);
  };
  const handleDel = () => {};
  return (
    <div>
      <div styleName="operation">
        <Button type="primary" onClick={changeStatus}>
          新增
        </Button>
      </div>
      <Modal visible={visible} onCancel={changeStatus}></Modal>
      <Table
        columns={ArticleTableColumns(handleEdit, handleDel)}
        dataSource={dataSource}
      ></Table>
    </div>
  );
};

export default Article;
