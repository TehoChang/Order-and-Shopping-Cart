import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { Link } from 'dva/router';
import style from './index.scss';


 /**  
  * path就是url的path，如何設定到address bar的?
    name是顯示在網頁的名稱

  */
const menus = [ 
  {
    key: 'home',
    path: '/home',
    name: '首頁頁'
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
    className: style.login, //這是什麼？scss吧
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
    // console.log('NavBar/index.js');

    super(props);
    this.state = {
      selectedKeys: []
    };
  }

  
  /**
   * 使用onClcik event 来改变state，点击NavBar item触发setState，改变
   * <Menu defaultSelectedKeys={}>
   * 正确的menu item才會亮起來
  /**
   * this.props.location.pathname來自
   */
  componentDidMount() {
    this.handleSetSelectedKeys(this.props.location.pathname);
  }

  componentDidUpdate(nextProps) {
    console.log(nextProps)
    console.log(this.props)
    const { pathname } = this.props.location;
    if (nextProps.location.pathname !== pathname) {
      // 当路由发生改变时, 改变当前菜單选中key值
      //key值是從pathname split出來
      this.handleSetSelectedKeys(nextProps.location.pathname);
    }
  }

  handleSetSelectedKeys(pathname) {
    // /admin = ["/","admin"]
    // 根据'/'把路由地址分割成一个数组

    const tempArr = pathname.split('/');
    // 如果数组存在，且数组的长度小于2,代表只有根路径/,设置为Home. 否则取数组中第二个值
    const key = tempArr && tempArr.length < 2 ? 'home' : tempArr[1];
    this.setState({
      selectedKeys: [key]
    });
  }
 
//這個key是<Menu.Item>的props，但是handleClickMenu是在<Menu onClick=>
//我不懂antd的組件<Menu>的props傳遞關係
  handleClickMenu = ({ key }) => {
    // 登出
    if (key === 'logout') {
      window.localStorage.clear();
      this.props.history.push('/login');
    }
  };

  //變數可以直接寫JSX的形式？
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
          
          defaultSelectedKeys={['home']} // defaultSelectedKeys 这个property接收的数据类型是 字符串数组
          selectedKeys={this.state.selectedKeys}
        >
      {/* 若沒有登入授權，就不能瀏覽路由 */}
          {/* 最上方的menus配置陣列 
          解構出每一項（object)的isAuthority，當isAuthority         
          */}
          {/* filte */}
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
