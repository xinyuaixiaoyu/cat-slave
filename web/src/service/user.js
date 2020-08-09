import { post } from '../utils/request';

export const register = (params = {}) => {
	return post('/api/register', params);
};

export const login = (params = {}) => {
	return post('/api/login', params);
};

export const queryUserByToken = (params = {}) => {
	return post('/api/queryUserByToken', params);
};

export const updateUser = (params = {}) => {
	return post('/api/updateUser', params);
};

export const queryAdmin = (params = {}) => {
	return post('/api/queryAdmin', params);
};
