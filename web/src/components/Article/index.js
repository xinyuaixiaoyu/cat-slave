import React, { useState, useEffect } from 'react';
import { queryArticle, queryArticleDetail } from '../../service/article';
import { queryCategory } from '@/service/category';
import ArticleDetail from './ArticleDetail';
import ArticleSearch from './ArticleSearch';
import './index.less';

const Article = () => {
	const [articleList, setArticle] = useState([]);
	const [articleDetail, setContent] = useState('');
	const [showDetail, changeStatus] = useState(false);
	const [categoryList, setCategory] = useState([]);
	const initData = async () => {
		const { success = false, articleList = [] } = await queryArticle();
		if (success) {
			setArticle(articleList);
		}
		const res = await queryCategory();
		if (res.success && res.categoryList.length) {
			setCategory(res.categoryList);
		}
	};
	const handleCategoryChange = async (params = {}) => {
		const { success = false, articleList = [] } = await queryArticle(params);
		if (success) {
			setArticle(articleList);
		}
	};
	const queryDetail = async (id) => {
		const { success = false, detail } = await queryArticleDetail({ id });
		if (success && detail.article) {
			setContent(detail.article);
			changeStatus(!showDetail);
		}
	};
	const onCancel = () => {
		changeStatus(!showDetail);
		setContent('');
	};
	useEffect(() => {
		initData();
	}, []);
	const articleRender = (item) => {
		return (
			<div styleName="item" key={item.date}>
				<div>
					<div styleName="title" onClick={() => queryDetail(item.id)}>
						{item.title}
					</div>
					<div styleName="date">{item.date}</div>
					<div styleName="describe">{item.describe}</div>
					<div styleName="button" onClick={() => queryDetail(item.id)}>
						Continue Reading
					</div>
				</div>
			</div>
		);
	};

	return (
		<div styleName="container">
			{showDetail ? (
				<div styleName="detail-container">
					<div onClick={onCancel} styleName="cancel-btn">
						返回
					</div>
					<ArticleDetail value={articleDetail}></ArticleDetail>
				</div>
			) : (
				<React.Fragment>
					<ArticleSearch
						value={categoryList}
						onChange={(params) => handleCategoryChange(params)}
					></ArticleSearch>
					{articleList.map((item) => {
						return articleRender(item);
					})}
				</React.Fragment>
			)}
		</div>
	);
};

export default Article;
