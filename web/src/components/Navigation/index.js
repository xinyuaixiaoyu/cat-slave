import React from 'react';
import { NavLink } from 'react-router-dom';
import RouterConfig from '@/config/router.config';
import './index.less';

const Navigation = () => {
  return (
    <div styleName="container">
      {RouterConfig.map((item) => {
        return (
          <NavLink key={item.path} to={item.path}>
            <div styleName="title">{item.title}</div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default Navigation;
