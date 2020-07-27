import React from 'react';
import { categoryFormConfig, articleFormLayout } from '../../../config';
import { Modal, Form } from 'antd';
import './index.less';

const CategoryModal = ({ visible, onCancel, handleSubmit }) => {
  const [form] = Form.useForm();
  return (
    <div>
      <Modal
        width={600}
        closable={false}
        centered={true}
        okText={'保存'}
        cancelText={'取消'}
        visible={visible}
        onCancel={onCancel}
        onOk={() => handleSubmit(form.getFieldsValue())}
      >
        <Form {...articleFormLayout} form={form}>
          {categoryFormConfig.map((item) => {
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
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryModal;
