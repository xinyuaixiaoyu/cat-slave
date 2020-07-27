/* eslint-disable react/display-name */
import React from 'react';
import { Button, Input, Select } from 'antd';
import Article from './components/Article';
import Category from './components/Category';

export const MenuConfig = [
  {
    Component: <Category />,
    title: 'Category',
  },
  {
    Component: <Article />,
    title: 'Article',
  },
];

export const ArticleTableColumns = (handleEdit, handleDel) => {
  return [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: () => (
        <React.Fragment>
          <Button
            type="primary"
            style={{ marginRight: '10px' }}
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button type="primary" onClick={handleDel} danger>
            Delete
          </Button>
        </React.Fragment>
      ),
    },
  ];
};

export const CategoryTableColumns = (delCategory) => {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (text, record) => (
        <React.Fragment>
          <Button
            type="primary"
            danger
            onClick={() => delCategory(record.categoryId)}
          >
            Delete
          </Button>
        </React.Fragment>
      ),
    },
  ];
};

export const articleFormConfig = [
  {
    label: 'Title',
    name: 'title',
    rules: [{ required: true, message: '请输入标题!' }],
    Component: <Input />,
  },
  {
    label: 'Describe',
    name: 'describe',
    rules: [{ required: true, message: '请输入描述!' }],
    Component: <Input />,
  },
  {
    label: 'Category',
    name: 'category',
    rules: [{ required: true, message: '请选择分类!' }],
    Component: <Select />,
  },
];

export const articleFormLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 21,
  },
};

export const categoryFormConfig = [
  {
    label: 'Name',
    name: 'name',
    rules: [{ required: true }],
    Component: <Input />,
  },
];
