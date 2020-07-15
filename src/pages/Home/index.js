import React from 'react';
import { connect } from 'dva';
import style from './index.scss';

function index(props) {
  return (
    <div className={style.home}>
      <div className={style.background}>
        {/* jsx，在标签内使用css style特殊写法 */}
        <h1 style={{fontSize: 50}}>欢迎来到Sweet Treats</h1>
        <h1>订制专属于你的蛋糕</h1>
        <p>{props.text}</p>
      </div>
    </div>
  );
}

// 关联home.js(model) 和 当前的组件index.js(home 组件)
export default connect(({ home }) => ({ ...home }))(index);
