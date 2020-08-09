import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { CategoryTableColumns } from '../../config';
import Modal from './CategoryModal';
import { queryCategory, addCategory, delCategory } from '@/service/category';
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
	const handleQueryCategory = async (pageData) => {
		const res = await queryCategory(pageData);
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
		const res = await addCategory(params);
		if (res.success) {
			changeStatus();
			handleQueryCategory(pagination);
		}
	};
	const hanldeDelCategory = async (id) => {
		const res = await delCategory({ categoryId: id });
		if (res.success) {
			const { categoryList = [] } = await handleQueryCategory(pagination);
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
		handleQueryCategory(pagination);
	}, [pagination.current]);

	return (
		<div>
			<div styleName="operation">
				<Button type="primary" onClick={changeStatus}>
					新增
				</Button>
			</div>
			{visible && (
				<Modal
					visible={visible}
					onCancel={changeStatus}
					handleSubmit={handleSubmit}
				></Modal>
			)}
			<Table
				columns={CategoryTableColumns(hanldeDelCategory)}
				dataSource={dataSource}
				pagination={{
					...pagination,
					onChange: (current) => handleTableChange(current),
				}}
				rowKey={(d) => d.categoryId}
			></Table>
		</div>
	);
};

export default Category;
