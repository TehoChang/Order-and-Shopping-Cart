import React from 'react';
import { Route, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import { connect } from 'dva';
import NoMatch from '../components/NoMatch';
import {Message} from 'antd'

// export default function SubRoutes(route) {  
//   console.log(route);
//   return (
//     <Route
//       render={
//          props => <route.component {...props} routes={route.routes} />
//       }
//     />
//   );
// }

// 以dynamic方法為基礎，封裝動態加載路由的方法
//這些參數從routeConfig_array，還有上層組件傳來（我是在做了路由權限的練習之後，才更理解這一部分）
const dynamicComponent = (app, models, component, routes, isSignedIn, userInfo, isAdmin) =>
  dynamic({
    app,
    models: () => models,
    component: () =>
      component().then(res => { //這寫法超過我的理解。是promise用法？
        //增加管理員權限控管 
        if (isAdmin) {
          if (!localStorage.admin || localStorage.admin !== 'iamadmin') {
            Message.error('您的帳號沒有管理員權限',1)
            return () => <Redirect to="/home" />
          }
        }
        if (isSignedIn) { //推測邏輯：那些isSignedIn=true的路由，如果localStorage沒有key或沒有email就跳到/login
          // 判断userInfo.id 是否有内容
          if (!localStorage.key || !localStorage.email) { //只要兩者中的一個沒有東西就跳到登錄頁
            return () => <Redirect to="/login" />;
          }
        } //這一段沒了，就沒有權限管理
        
        // console.log('res:', res)
        const Component = res.default || res;  //若用戶是登錄狀態，則正常渲染組件
        return props => <Component {...props} app={app} routes={routes} />

          ;
      })
  });
function SubRoutes({ routes, component, app, model, isSignedIn, userInfo, isAdmin }) {
  // console.log('subRoutes.js');
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

// 重定向封装组件。 這段在幹嘛？
export function RedirectRoute({ routes, from, exact }) {
  const routeR = routes.filter(item => {
    return item.redirect;
  });

  const to = routeR.length ? routeR[0].path : routes[0].path;
  return <Redirect exact={exact} from={from} to={to} />;
}

// NoMatchRoute
export function NoMatchRoute({ status = 404 }) {
  return <Route render={props => <NoMatch {...props} status={status} />} />;
}

// 類似把用戶資訊存到store
export default connect(({ global }) => ({
  userInfo: global.userInfo
}))(SubRoutes);
