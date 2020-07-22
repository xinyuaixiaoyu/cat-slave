import Article from '@/components/Article/index';
import Home from '@/components/Home/index';

export default [
  {
    path: '/',
    Component: () => Home,
    exact: true,
    title: '首页',
  },
  {
    path: '/article',
    Component: () => Article,
    exact: true,
    title: '文章',
  },
];
