import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';
import './index.less';

function Manta() {
  const [num, setNum] = useState(0);

  const add = () => {
    setNum(num + 1);
    console.log(styles);
  };

  const reduce = () => {
    setNum(num - 1);
  };

  return (
    <div styleName="manta">
      <div>挺牛逼个博客</div>
      <button onClick={reduce}>-</button>
      <div>{num}</div>
      <button onClick={add}>+</button>
    </div>
  );
}

ReactDOM.render(<Manta />, document.getElementById('App'));
