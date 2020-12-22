import React, { Component } from 'react';
import { Table, Button, Icon, Row, Col } from 'antd';
import Request from '../../utils/Request';
import style from './index.scss';

//這個class不需要叫index，檔案叫index.js就好
//import './Menus' 會自動去找的資料夾下的index.js檔案
export default class xxx extends Component {
  state = {
    cart: [],
    menus: []
  };

  // 鉤子函數
  componentDidMount() {
    this.getMenusData();
  }

  // 獲取菜單列表的數據
  getMenusData = () => {
    Request('/menu.json').then(res => {
      // console.log(res);
      if (res && res.status === 200 && res.data) {
        this.setState({
          menus: res.data
        });
      }
    });
  };
//看起來很複雜，反正就是照antd <Table>的規則去設定 layout
  renderMenusTable() {
    const columns = [
      {
        key: 'size',
        title: '種類＆尺寸',
        dataIndex: 'size',//去attribute_dataSource的來源找size
        render: (text, record) => {
          // console.log(record);
          if (record.price) {
            return <span>{text}</span>; //text就是record中，size這個key的value,由dataIndex:'size'指定
          }
          return {
            children: <strong>{text}</strong>,
            props: {
              colSpan: 2
            }
          };
        }
      },
      {
        key: 'price',
        title: '價格',
        dataIndex: 'price',
        render: (text, record) => {
          return <span>{text}</span>;
        }
      },
      {
        key: 'action',
        title: '加入',
        render: (text, record) => {
          const obj = {
            children: (
              <Button
                onClick={() => handleAddMenus(record)}
                className={style['add-btn']}
              >
                <Icon type="plus" />
              </Button>
            ),
            props: []
          };
          if (!record.price) {
            obj.props.colSpan = 0;
          }
          return obj;
        }
      }
    ];

    const handleAddMenus = record => {
    
      // const { name, price, size } = record;

      let { cart } = this.state;
      const index = cart.findIndex(item => item.key === record.key);
      // console.log(index);
      index >= 0
        ? cart.splice(index, 1, {    //splice方法的第三個參數我不知道用法。反正是count +1
            ...cart[index],
            count: cart[index].count + 1
          })
        : (cart = [  //如果新增項的index<0(原先不存在），在cart array中新增這一項，並將這一項obj的count設為1
            ...cart,
            {
              ...record,
              count: 1
            }
          ]);

      // 儲存到state
      this.setState({
        cart
      });
    };

    let data = this.state.menus;

    //  處理數據格式
    let dataSource = [];
    for (const key in data) {     
      let item = data[key];
      
      dataSource.push({
        key: item.name,
        size: item.name
      });
      item.options.forEach((ele, index) => {
        dataSource.push({ ...ele, name: item.name, key: key + '-' + index });
      });
    }
    
//一直出現的record應該是dataSource中的一條數據
    return (
      <Table
        pagination={false}
        className="menus-table"
        dataSource={dataSource}
        columns={columns}
      />
    );
  }
  renderCartTable() {
    const columns = [
      {
        key: 'count',
        title: '數量',
        dataIndex: 'count',
        render: (text, record) => (
          <span>
            <Button
              onClick={() => handleDecrease(record)}
              className={style['cart-btn']}
            >
              -
            </Button>
            <span>{record.count}</span>
            <Button
              onClick={() => handleIncrease(record)}
              className={style['cart-btn']}
            >
              +
            </Button>
          </span>
        )
      },
      {
        key: 'name',
        title: '種類',
        dataIndex: 'name'
      },
      {
        key: 'size',
        title: '尺寸',
        dataIndex: 'size'
      },
      {
        key: 'price',
        title: '價格',
        dataIndex: 'price'
      }
    ];
    // 減
    const handleDecrease = record => {
      
      // cart 數據
      let { cart } = this.state;
      // 获取当前点击的項 在cart中的index
      const index = cart.findIndex(item => item.key === record.key);
      // 当前点击的数据对象
      const current = cart[index];
      // console.log(current);
      // 当前數量小于等于1时, 购物车的商品移除掉 否则商品數量减1
      if (current.count <= 1) {
        cart.splice(index, 1);
      } else {
        cart.splice(index, 1, {
          ...current,
          count: current.count - 1
        });
      }
      // 更新状态
      this.setState({
        cart
      });
    };
    // 加
    const handleIncrease = record => {
      // cart 数据
      let { cart } = this.state;
      // 获取当前点击的数据的下标
      const index = cart.findIndex(item => item.key === record.key);
      // 当前点击的数据对象
      const current = cart[index];
      // console.log(current);
      // 商品數量+1

      cart.splice(index, 1, {
        ...current,
        count: current.count + 1
      });

      // 更新状态
      this.setState({
        cart
      });
    };
    return (
      <Table
        pagination={false}
        className="menus-table cart"
        dataSource={this.state.cart}
        columns={columns}
        locale={{
          emptyText: '购物车没有任何商品'
        }}
      />
    );
  }

  render() {
    const totalPrice = this.state.cart.reduce(
      (total, item) => (total += item.price * item.count),
      0
    );
    return (
      <Row>
        <Col sm={24} md={16}>
          {this.renderMenusTable()}
        </Col>
        <Col sm={24} md={8}>
          {this.renderCartTable()}
          <p className={style['total-price']}>总价: {totalPrice}</p>
          <Button type="primary" className={style['submit-btn']}>
            提交
          </Button>
        </Col>
      </Row>
    );
  }
}
