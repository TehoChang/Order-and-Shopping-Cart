import React from 'react';
import { Route, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import { connect } from 'dva';
import NoMatch from '../components/NoMatch';
import {Message} from 'antd'














const dynamicComponent = (app, models, component, routes, isSignedIn, userInfo, isAdmin) =>
  dynamic({
    app,
    models: () => models,
    component: () =>
      component().then(res => { 
        
        if (isAdmin) {
          if (!localStorage.admin || localStorage.admin !== 'iamadmin') {
            Message.error('您的帳號沒有管理員權限',1)
            return () => <Redirect to="/home" />
          }
        }
        if (isSignedIn) { 
          
          if (!localStorage.key || !localStorage.email) { 
            return () => <Redirect to="/login" />;
          }
        } 
        
        
        const Component = res.default || res;  
        return props => <Component {...props} app={app} routes={routes} />

          ;
      })
  });
function SubRoutes({ routes, component, app, model, isSignedIn, userInfo, isAdmin }) {
  
  return (
    <Route
      component={dynamicComponent(
        app,
        model,
        component,
        routes,
        isSignedIn,
        userInfo,
        isAdmin
      )}
    />
  );
}


export function RedirectRoute({ routes, from, exact }) {
  const routeR = routes.filter(item => {
    return item.redirect;
  });

  const to = routeR.length ? routeR[0].path : routes[0].path;
  return <Redirect exact={exact} from={from} to={to} />;
}


export function NoMatchRoute({ status = 404 }) {
  return <Route render={props => <NoMatch {...props} status={status} />} />;
}


export default connect(({ global }) => ({
  userInfo: global.userInfo
}))(SubRoutes);
