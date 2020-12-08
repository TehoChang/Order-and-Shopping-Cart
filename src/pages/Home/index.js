import React from 'react';
import { connect } from 'dva';
import style from './index.scss';

function index(props) {
  
  return (
    <div className={style.home}>
      <div className={style.background}>
        
        <h1 style={{fontSize: 50}}>歡迎來到Sweet Treats</h1>
        <h1>客製專屬於你的蛋糕</h1>
        <p>{props.text}</p>
      </div>
    </div>
  );
}

// 關連home.js(model) 和 當前的組件index.js(home 組件)
// 應該跟mapStateToProps一樣
export default connect(({ home }) => ({ ...home }))(index);
