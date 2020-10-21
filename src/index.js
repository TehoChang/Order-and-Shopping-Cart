import dva from 'dva';
import './index.css';
// import 'ant.less';

// 1. Initialize,使用dva(）创建一个app实例
const app = dva();

// console.log('index.js');

// 2. Plugins
// app.use({});

// 3. Model 在这里管理redux state
app.model(require('./models/global').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
