import React from 'react';
import './index.less';

const articleList = [
  {
    title: 'Cover image showcase',
    date: 'May 28, 2015 in tranquilpeak, features',
    imgUrl: '../../../assets/cover.jpg',
    description:
      'Tranquilpeak is a gorgeous responsive theme for Hexo blog framework. It has many features and integrated services to improve user experience.',
  },
  {
    title: 'Cover image showcase',
    date: 'May 28, 2015 in tranquilpeak, features',
    imgUrl: '../../../assets/cover.jpg',
    description:
      'Tranquilpeak is a gorgeous responsive theme for Hexo blog framework. It has many features and integrated services to improve user experience.',
  },
  {
    title: 'Cover image showcase',
    date: 'May 28, 2015 in tranquilpeak, features',
    imgUrl: '../../../assets/cover.jpg',
    description:
      'Tranquilpeak is a gorgeous responsive theme for Hexo blog framework. It has many features and integrated services to improve user experience.',
  },
  {
    title: 'Cover image showcase',
    date: 'May 28, 2015 in tranquilpeak, features',
    imgUrl: '../../../assets/cover.jpg',
    description:
      'Tranquilpeak is a gorgeous responsive theme for Hexo blog framework. It has many features and integrated services to improve user experience.',
  },
  {
    title: 'Cover image showcase',
    date: 'May 28, 2015 in tranquilpeak, features',
    imgUrl: '../../../assets/cover.jpg',
    description:
      'Tranquilpeak is a gorgeous responsive theme for Hexo blog framework. It has many features and integrated services to improve user experience.',
  },
];

const Article = () => {
  const articleRender = (item, index) => {
    if (index === 0) {
      return (
        <div styleName="article-item-head" key={item.date}>
          <div styleName="title">{item.title}</div>
          <div styleName="date">{item.date}</div>
          <div styleName="description">{item.description}</div>
          <div styleName="button">Continue Reading</div>
          <img src={item.imgUrl} alt="" styleName="first-img"></img>
        </div>
      );
    } else {
      return (
        <div styleName="article-item" key={item.date}>
          <img src={item.imgUrl} alt="" styleName="img"></img>
          <div>
            <div styleName="title">{item.title}</div>
            <div styleName="date">{item.date}</div>
            <div styleName="description">{item.description}</div>
            <div styleName="button">Continue Reading</div>
          </div>
        </div>
      );
    }
  };

  return (
    <div styleName="container">
      {articleList.map((item, index) => {
        return articleRender(item, index);
      })}
    </div>
  );
};

export default Article;
