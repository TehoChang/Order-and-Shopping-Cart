//其中很多是dva特有的用法
import React from 'react';
import { Router, Switch } from 'dva/router';
// import IndexPage from './pages/IndexPage';
// import Home from './pages/Home';
// import Menus from './pages/Menus';
// import About from './pages/About';
// import Admin from './pages/Admin';
// import Login from './pages/User/Login';
// import Register from './pages/User/Register';
import SubRoutes from './utils/SubRoutes';

// 路由權限的開關
const isSignedIn = true;
const isAdmin=true;

const RouteConfig = [ //
  {
    path: '/',
    // component: IndexPage,
    component: () => import('./pages/IndexPage'),
    model: [],
    routes: [
      {
        path: '/home',
        component: () => import('./pages/Home'),
        model: [import('./models/home')],
        redirect: true,
        isSignedIn
      },
      {
        path: '/menus',
        component: () => import('./pages/Menus'),
        model: [],
        isSignedIn
      },
      {
        path: '/admin',
        component: () => import('./pages/Admin'),
        model: [],
        isAdmin
        // isSignedIn,
      },
      {
        path: '/about',
        component: () => import('./pages/About'),
        model: [],
        isSignedIn,
        routes: [
          {
            path: '/about/history',
            model: [],
            component: () => import('./pages/About/History')
          },
          {
            path: '/about/contact',
            model: [],
            component: () => import('./pages/About/Contact'),
            routes: [
              {
                path: '/about/contact/phone',
                model: [],
                component: () => import('./pages/About/Phone')
              },
              {
                path: '/about/contact/address',
                model: [],
                component: () => import('./pages/About/Address')
              }
            ]
          },
          {
            path: '/about/orderingguide',
            model: [],
            component: () => import('./pages/About/OrderingGuide')
          },
          {
            path: '/about/delivery',
            model: [],
            component: () => import('./pages/About/Delivery')
          }
        ]
      },
      {
        path: '/login',
        component: () => import('./pages/User/Login'),
        model: []
      },
      {
        path: '/register',
        component: () => import('./pages/User/Register'),
        model: []
      }
    ]
  }
];

function RouterConfig({ history, app }) {
  // console.log('router.js');
  // console.log(app); 有這個app參數應該是因為dva的關係。history也是
  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/" component={IndexPage} /> */}
        {RouteConfig.map((route, i) => (
          // 调用封装组件
          <SubRoutes key={i} {...route} app={app} />
        ))}
      </Switch>
    </Router>
  );
}

export default RouterConfig;
