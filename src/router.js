import React from 'react';
import { Router, Switch } from 'dva/router';
import SubRoutes from './utils/SubRoutes';

const isSignedIn = true;
const isAdmin=true;

const RouteConfig = [ 
  {
    path: '/',
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
  return (
    <Router history={history}>
      <Switch>
        {RouteConfig.map((route, i) => (
          <SubRoutes key={i} {...route} app={app} />
        ))}
      </Switch>
    </Router>
  );
}

export default RouterConfig;
