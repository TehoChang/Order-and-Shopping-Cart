import React, { Component } from 'react';
import { Tabs } from 'antd';
import style from './index.scss';
import { Switch } from 'dva/router';
import SubRoutes, { RedirectRoute } from '../../utils/SubRoutes';

const { TabPane } = Tabs;

export default class index extends Component {
  
  handleChangeTab = key => {
    // console.log(key);
    // window.location.href = '/#' + key;
    // console.log(this);
    if (this.props.location.pathname !== key) {
      this.props.history.push(key);
    }
  };
  render() {
    const { routes, app } = this.props;
    return (
      <div className={style.about}>
        <Tabs
          className={style.tabs}
          tabPosition={'left'}
          activeKey={this.props.location.pathname}
          onChange={this.handleChangeTab}
        >
          <TabPane tab="歷史訂單" key="/about/history" />
          <TabPane tab="聯繫我們" key="/about/contact" />
          <TabPane tab="點餐檔案" key="/about/orderingguide" />
          <TabPane tab="快遞信息" key="/about/delivery" />
        </Tabs>
        <div className={style.routes}>
          
          <Switch>
            {routes.map((route, i) => (
              
              <SubRoutes key={i} {...route} app={app} />
            ))}

            <RedirectRoute exact={true} from={'/about'} routes={routes} />
          </Switch>
        </div>
      </div>
    );
  }
}
