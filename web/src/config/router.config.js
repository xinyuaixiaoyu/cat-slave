import Article from '@/components/Article/index';
import Home from '@/components/Home/index';
import Admin from '@/components/Admin/index';

export default [
	{
		path: '/',
		Component: () => Home,
		exact: true,
		title: '首页',
		needAdmin: false,
	},
	{
		path: '/article',
		Component: () => Article,
		exact: true,
		title: '文章',
		needAdmin: false,
	},
	{
		path: '/admin',
		Component: () => Admin,
		exact: true,
		title: '管理',
		needAdmin: true,
	},
];
