import axios from 'axios';
import Loading from '@/components/Loading';
import Message from '@/components/Message';
import cookies from 'react-cookies';

axios.defaults.baseUrl = 'http://catslave.applinzi.com';
axios.defaults.timeout = 5000;

axios.defaults.headers.post['Content-Type'] =
	'application/x-www-form-urlencoded;charset=UTF-8';

axios.interceptors.request.use(
	(config) => {
		const _token = cookies.load('token');
		_token && (config.headers.authorization = _token);
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	(response) => {
		if (response.status === 200) {
			return Promise.resolve(response);
		} else {
			return Promise.reject(response);
		}
	},
	(error) => {
		if (error.response.status) {
			return Promise.reject(error.response);
		}
	}
);

const isBuild = /5050+|catslave/.test(window.location.href);
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
	const _url = isBuild ? url.replace(/\/api/, '') : url;
	return new Promise((resolve, reject) => {
		Loading.show();
		axios
			.get(_url, {
				params,
			})
			.then((res) => {
				Loading.hide();
				resolve(res.data);
			})
			.catch((err) => {
				Loading.hide();
				Message.error(err.statusText || '网络异常，请稍后重试');
				reject(err);
			});
	});
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
	const _url = isBuild ? url.replace(/\/api/, '') : url;
	return new Promise((resolve, reject) => {
		Loading.show();
		axios
			.post(_url, params)
			.then((res) => {
				Loading.hide();
				resolve(res.data);
			})
			.catch((err) => {
				Loading.hide();
				Message.error(err.statusText || '网络异常，请稍后重试');
				reject(err);
			});
	});
}
