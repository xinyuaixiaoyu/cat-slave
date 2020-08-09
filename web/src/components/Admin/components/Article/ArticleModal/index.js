import React, { useState, useImperativeHandle } from 'react';
import { articleFormConfig, articleFormLayout } from '../../../config';
import { Modal, Form, Select } from 'antd';
import Editor from '../Editor';
import BraftEditor from 'braft-editor';
import './index.less';

const ArticleModal = ({
	cRef,
	visible,
	onCancel,
	categoryList,
	handleSubmit,
}) => {
	const [form] = Form.useForm();
	const [editorState, setEditor] = useState(
		BraftEditor.createEditorState(null)
	);
	const changeEditor = (editor) => {
		setEditor(editor);
	};
	const setFieldsValue = (value) => {
		const { _id = '', article, category, describe, title } = value;
		const currentData = {
			article: BraftEditor.createEditorState(article),
			category,
			describe,
			title,
		};
		if (_id) {
			currentData._id = _id;
			changeEditor(BraftEditor.createEditorState(article));
		}
		form.setFieldsValue(currentData);
	};
	const onOk = () => {
		const {
			_id = '',
			article,
			category,
			describe,
			title,
		} = form.getFieldValue();
		const currentData = {
			article: article.toHTML(),
			category,
			describe,
			title,
		};
		if (_id) {
			currentData.id = _id;
		}
		handleSubmit(currentData);
	};
	useImperativeHandle(cRef, () => ({
		setFieldsValue,
	}));
	if (!visible) return null;
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
				onOk={onOk}
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
						label={'Category'}
						name={'category'}
						rules={[{ required: true }]}
					>
						<Select>
							{categoryList.length > 0 &&
								categoryList.map((item) => {
									return (
										<Select.Option
											value={item.categoryId}
											key={item.categoryId}
										>
											{item.name}
										</Select.Option>
									);
								})}
						</Select>
					</Form.Item>
					<Form.Item
						label={'Article'}
						name={'article'}
						rules={[{ required: true }]}
					>
						<Editor
							onChange={changeEditor}
							value={editorState}
							form={form}
						></Editor>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default ArticleModal;
