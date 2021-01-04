import React from 'react';
import { connect } from 'dva';
import style from './index.scss';

function index(props) {
  
  return (
    <div className={style.home}>
      <div className={style.background}>
        
        <div className={style.text}>
          <h1 style={{fontSize: 50}}>歡迎來到Sweet Treats</h1>
          <h1>源於法國的手工蛋糕</h1>
        </div>
      </div>
    </div>
  );
}

export default connect(({ home }) => ({ ...home }))(index);
