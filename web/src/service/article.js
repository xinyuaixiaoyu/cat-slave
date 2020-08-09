import { post } from '../utils/request';

export const queryArticle = (params = {}) => {
	return post('/api/queryArticle', params);
};

export const changeArticle = (params = {}) => {
	return post('/api/changeArticle', params);
};

export const delArticle = (params = {}) => {
	return post('/api/delArticle', params);
};

export const queryArticleDetail = (params = {}) => {
	return post('/api/queryArticleDetail', params);
};
