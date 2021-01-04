import dva from 'dva';

import './index.css'; 

const app = dva();
('index.js');


app.model(require('./models/global').default);


app.router(require('./router').default);


app.start('#root');
