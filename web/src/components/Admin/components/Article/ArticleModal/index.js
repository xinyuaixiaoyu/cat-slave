import React, { useState } from 'react';
import { articleFormConfig, articleFormLayout } from '../../../config';
import { Modal, Form } from 'antd';
import Editor from '../Editor';
import './index.less';

const ArticleModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [editorHtml, setEditor] = useState('');
  console.log(typeof editorHtml);
  const handleSubmit = () => {
    console.log(form.getFieldsValue());
  };
  return (
    <div>
      <Modal
        width={1000}
        closable={false}
        centered={true}
        okText={'保存'}
        cancelText={'取消'}
        visible={visible}
        onCancel={onCancel}
        onOk={handleSubmit}
      >
        <Form {...articleFormLayout} form={form}>
          {articleFormConfig.map((item) => {
            return (
              <Form.Item
                label={item.label}
                name={item.name}
                rules={item.rules}
                key={item.name}
              >
                {item.Component}
              </Form.Item>
            );
          })}
          <Form.Item
            label={'Article'}
            name={'article'}
            rules={[{ required: true }]}
          >
            <Editor setEditor={setEditor}></Editor>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ArticleModal;
