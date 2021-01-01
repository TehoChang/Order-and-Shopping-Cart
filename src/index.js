import dva from 'dva';

import './index.css'; //不一定要寫import xxx from 'xxx'，直接import 'xxx'，import整個檔案
                      //RouteConfig就是這樣寫的
// import 'ant.less';

// 1. Initialize,使用dva(）创建一个app实例
const app = dva();
console.log('index.js');

// 2. Plugins
// app.use({});

// 3. Model 在这里管理redux state
app.model(require('./models/global').default);

// 4. Router 將配置好的router組件傳進來
app.router(require('./router').default);

// 5. Start
app.start('#root');
