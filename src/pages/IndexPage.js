import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import '../App.less';
import { Switch } from 'dva/router';
import SubRoutes, { RedirectRoute, NoMatchRoute } from '../utils/SubRoutes';
import NavBar from './NavBar';
import styles from './IndexPage.scss';

const { Header, Content, Footer } = Layout;

function IndexPage(props) {
  const { routes, app } = props;
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <NavBar {...props} />
      </Header>
      <Content className={styles.content}>
        <Switch>
          {routes.map((route, i) => (
            <SubRoutes key={i} {...route} app={app} />
          ))}   
          <RedirectRoute exact={true} from={'/'} routes={routes} />
          <NoMatchRoute />
        </Switch>
      </Content>
      <Footer className={styles.footer}>
        <div> Copyright &copy; 2020 By TehoChang</div>
      </Footer>
    </Layout>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
