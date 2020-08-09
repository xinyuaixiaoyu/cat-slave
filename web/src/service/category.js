import { post } from '../utils/request';

export const addCategory = (params = {}) => {
	return post('/api/addCategory', params);
};

export const delCategory = (params = {}) => {
	return post('/api/delCategory', params);
};

export const queryCategory = (params = {}) => {
	return post('/api/queryCategory', params);
};
