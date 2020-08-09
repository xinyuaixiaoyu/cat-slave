import React, { useState, useEffect, useRef } from 'react';
import Modal from './ArticleModal/index';
import {
	delArticle,
	changeArticle,
	queryArticleDetail,
	queryArticle,
} from '@/service/article';
import { queryCategory } from '@/service/category';
import { Table, Button } from 'antd';
import { ArticleTableColumns } from '../../config';
import './index.less';

const Article = () => {
	const [visible, setVisible] = useState(false);
	const [dataSource, setTableData] = useState([]);
	const [category, setCategory] = useState([]);
	const childRef = useRef();
	const changeStatus = () => {
		setVisible(!visible);
	};
	const handleDel = async (id) => {
		const res = await delArticle({ id });
		if (res.success) {
			handleQueryArticle(category);
		}
	};
	const handleSubmit = async (params) => {
		const res = await changeArticle(params);
		if (res.success) {
			changeStatus();
			handleQueryArticle(category);
		}
	};
	const handleEdit = async (id) => {
		const res = await queryArticleDetail({ id });
		if (res.success) {
			changeStatus();
			childRef.current.setFieldsValue(res.detail);
		}
	};
	const handleQueryArticle = async (val) => {
		const { success = false, articleList = [] } = await queryArticle();
		if (success) {
			let currentData = [];
			if (articleList.length > 0) {
				currentData = articleList.map((item) => {
					const index = val.findIndex((i) => i.categoryId === item.category);
					return {
						id: item.id,
						title: item.title,
						type: val[index].name,
						date: item.date,
					};
				});
			}
			setTableData(currentData);
		}
	};
	const initData = async () => {
		const { categoryList = [] } = await queryCategory();
		setCategory(categoryList);
		handleQueryArticle(categoryList);
	};
	useEffect(() => {
		initData();
	}, []);
	return (
		<div>
			<div styleName="operation">
				<Button type="primary" onClick={changeStatus}>
					新增
				</Button>
			</div>
			{visible && (
				<Modal
					cRef={childRef}
					visible={visible}
					categoryList={category}
					onCancel={changeStatus}
					handleSubmit={handleSubmit}
				></Modal>
			)}
			<Table
				columns={ArticleTableColumns(handleEdit, handleDel)}
				dataSource={dataSource}
				rowKey={(d) => d.id}
			></Table>
		</div>
	);
};

export default Article;
