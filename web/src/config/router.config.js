import Article from '@/components/Article/index';

export default [
  {
    path: '/article',
    Component: () => Article,
    exact: true,
    title: '文章',
  },
];
