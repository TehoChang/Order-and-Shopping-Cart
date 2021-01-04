import React, { Component } from 'react';
import { Link, Switch } from 'dva/router';
import styles from './TabPane.scss';
import SubRoutes, { RedirectRoute } from '../../utils/SubRoutes';

export default class index extends Component {
  render() {
    const { routes, app } = this.props;
    return (
      <div className={styles.tabpane}>
        <p className={styles.title}>聯繫我們</p>
        <div className={styles.content}>
          <Link to="/about/contact/phone">電話</Link>
          <Link to="/about/contact/address">地址</Link>
        </div>

        <div className={styles.info}>
          <Switch>
            {routes.map((route, i) => (
              <SubRoutes key={i} {...route} app={app} />
            ))}

            <RedirectRoute
              exact={true}
              from={'/about/contact'}
              routes={routes}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
