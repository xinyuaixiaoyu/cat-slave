/* eslint-disable react/display-name */
import React from 'react';
import { Button } from 'antd';
import Article from './components/Article/index';

export const MenuConfig = [
  {
    Component: <Article />,
    title: 'Article',
  },
];

export const TableColumns = [
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
        <Button type="primary" style={{ marginRight: '10px' }}>
          Edit
        </Button>
        <Button type="primary" danger>
          Delete
        </Button>
      </React.Fragment>
    ),
  },
];
