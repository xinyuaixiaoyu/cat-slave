import React, { useState } from 'react';
import { userConfig } from './util';
import './index.less';

const User = () => {
  const [isLogin, setLoginStatus] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const handleChange = (value, key) => {
    setUserData({
      [key]: value,
    });
  };
  const inputConfig = userConfig(isLogin, userData);
  const changeStatus = () => {
    setLoginStatus(!isLogin);
  };
  return (
    <div styleName="container">
      <div styleName="title">Welcome</div>
      <div styleName="description">
        We can communicate with each other if you are interested
      </div>
      <div styleName="description">
        You can leave a message comment thumb up
      </div>
      <div styleName="input_container">
        {inputConfig.map((item) => {
          return (
            <div key={item.name} styleName="inputItem">
              <input
                type={item.type}
                placeholder={item.placeHolder}
                value={item.value}
                onChange={(e) => handleChange(e.target.value, item.name)}
              />
            </div>
          );
        })}
      </div>
      <div styleName="button">{isLogin ? 'Login' : 'Register'}</div>
      <div styleName="tab_container">
        <div styleName="forget">Password</div>
        <div>|</div>
        <div styleName="tab_btn" onClick={changeStatus}>
          {!isLogin ? 'Login' : 'Register'}
        </div>
      </div>
    </div>
  );
};

export default User;
