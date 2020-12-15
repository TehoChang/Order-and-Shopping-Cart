import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { Link } from 'dva/router';
import style from './index.scss';

const menus = [
  {
    key: 'home',
    path: '/home',
    name: '首頁'
  },
  {
    key: 'menus',
    path: '/menus',
    name: '菜單'
  },
  {
    key: 'admin',
    path: '/admin',
    name: '管理'
  },
  {
    key: 'about',
    path: '/about',
    name: '關於我們'
  },
  {
    key: 'login',
    path: '/login',
    name: '登錄',
    className: style.login,
    isAuthority: true
  },
  //为什么这里的结构跟上面几项不一样？

  {
    key: 'register',
    path: '/register',
    name: '註冊',
    className: style.register,
    isAuthority: true
  }
];

export default class index extends Component {
  constructor(props) {
    // console.log(props);
    // console.log('NavBar/index.js');

    super(props);
    this.state = {
      selectedKeys: []
    };
  }

  
  /**
   * 当页面刷新时，组件会重新加载，会执行 componentDidMount(cdm) 鉤子函數
   * 为了解决刷新页面，页面虽然改变了，但NavBar的selectedKeys没有改变的问题
   * 使用onClcik event 来改变state，点击NavBar item触发setState，改变
   * <Menu defaultSelectedKeys={}>
   */
  componentDidMount() {
    this.handleSetSelectedKeys(this.props.location.pathname);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { pathname } = this.props.location;
    if (nextProps.location.pathname !== pathname) {
      // 当路由发生改变时, 改变当前菜單选中key值
      this.handleSetSelectedKeys(nextProps.location.pathname);
    }
  }

  handleSetSelectedKeys(pathname) {
    // /admin = ["/","admin"]
    // 根据'/'把路由地址分割成一个数组

    const tempArr = pathname.split('/');
    // 如果数组存在，且数组的长度小于2,表示的是只有根路径/,设置为Home. 否则取数组中第二个值
    const key = tempArr && tempArr.length < 2 ? 'home' : tempArr[1];
    this.setState({
      selectedKeys: [key]
    });
  }

  handleClickMenu = ({ key }) => {
    // 登出
    if (key === 'logout') {
      window.localStorage.clear();
      this.props.history.push('/login');
    }
  };

  menu = (
    <Menu onClick={this.handleClickMenu}>
      <Menu.Item key="logout">
        <span>退出</span>
      </Menu.Item>
    </Menu>
  );

  render() {
    return (
      <nav className={style.header}>
        <a className={style.logo} href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="d-block mx-auto"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
            <line x1="9.69" y1="8" x2="21.17" y2="8" />
            <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
            <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
            <line x1="14.31" y1="16" x2="2.83" y2="16" />
            <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
          </svg>
        </a>
        <Menu
          className={style['menu-left']}
          mode="horizontal"
          defaultSelectedKeys={['home']}
          selectedKeys={this.state.selectedKeys}
        >
          {menus
            .filter(
              ({ isAuthority }) =>
                !(isAuthority && localStorage.key && localStorage.email)
            )
            .map(({ key, path, name, className }) => (
              <Menu.Item key={key} className={className}>
                <Link to={path}>{name}</Link>
              </Menu.Item>
            ))}
        </Menu>
        {/* 用户email和退出 */}
        {localStorage.email && localStorage.key && (
          <Dropdown overlay={this.menu} className={style['dropdown-menu']}>
            <a className="ant-dropdown-link">
              <span className={style.email}>{localStorage.email}</span>{' '}
              <Icon className={style.icon} type="down" />
            </a>
          </Dropdown>
        )}
      </nav>
    );
  }
}
